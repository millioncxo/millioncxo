'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoComponent from '@/components/LogoComponent';
import { Edit, Receipt, UserPlus, Trash2 } from 'lucide-react';
import { validateEmail, isValidEmail } from '@/lib/email-validation';
import NotificationContainer, { useNotifications } from '@/components/Notification';

interface Client {
  _id: string;
  businessName: string;
  fullRegisteredAddress: string;
  pointOfContactName: string;
  pointOfContactTitle?: string;
  pointOfContactEmail: string;
  additionalEmails?: string[];
  pointOfContactPhone?: string;
  websiteAddress?: string;
  country?: string;
  numberOfLicenses?: number;
  planType?: 'REGULAR' | 'POC';
  pricePerLicense?: number;
  currency?: 'USD' | 'INR';
  customPlanName?: string;
  accountManagerId?: { _id: string; name: string; email: string };
  currentPlanId?: { _id: string; name: string };
  sdrAssignments?: Array<{ sdrId: { name: string; email: string } }>;
  paymentStatus?: 'PENDING' | 'PAID' | 'PARTIAL';
  paymentDetails?: {
    amountRequested: number;
    numberOfMonths: number;
    paymentTerms?: string;
    dealClosedDate?: string;
    notes?: string;
  };
  contract?: {
    _id: string;
    fileId?: string;
    version?: string;
    signedDate?: Date;
    createdAt: Date;
  } | null;
  invoicesWithFiles?: Array<{
    _id: string;
    invoiceNumber?: string;
    fileId: string;
    createdAt: Date;
  }>;
}

interface Plan {
  _id: string;
  name: string;
  description: string;
  pricePerMonth: number;
  creditsPerMonth: number;
  planConfiguration?: {
    requiresSdrCount?: boolean;
    requiresLicenseCount?: boolean;
    fixedPrice?: boolean;
    pricePerSdr?: number;
    pricePerLicense?: number;
  };
}

interface LicenseInput {
  productOrServiceName: string;
  serviceType: string;
  label: string;
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showCreateAccount, setShowCreateAccount] = useState<string | null>(null);
  const [invoiceGenerateData, setInvoiceGenerateData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    amountOverride: '',
    description: '',
    dueDate: '',
    invoiceDate: '',
    invoiceNumber: '',
    paymentTerms: '',
    notes: '',
  });
  const [generatingInvoice, setGeneratingInvoice] = useState(false);
  const [accountFormData, setAccountFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [derivedEndDate, setDerivedEndDate] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    pointOfContactName: '',
    pointOfContactTitle: '',
    pointOfContactEmail: '',
    additionalEmails: [] as string[],
    pointOfContactPhone: '',
    websiteAddress: '',
    country: '',
    fullRegisteredAddress: '',
    currentPlanId: '',
    customPlanName: '', // For "Other" plan option
    planType: 'REGULAR' as 'REGULAR' | 'POC',
    pricePerLicense: 0,
    currency: 'USD' as 'USD' | 'INR',
    discountPercentage: 0,
    licenses: [] as LicenseInput[],
    numberOfLicenses: 0,
    numberOfSdrs: 0,
    positiveResponsesTarget: 0,
    meetingsBookedTarget: 0,
    paymentDetails: {
      numberOfMonths: 1,
      paymentTerms: '',
      dealClosedDate: '',
      notes: '',
    },
  });
  const [additionalEmailInput, setAdditionalEmailInput] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [additionalEmailError, setAdditionalEmailError] = useState<string | null>(null);
  
  // Notification system
  const { notifications, showNotification, dismissNotification } = useNotifications();
  
  // Field-level errors (for red squiggly lines)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  // Helper function to parse field errors from error messages
  const parseFieldError = (errorMessage: string): { field: string; message: string } | null => {
    // Pattern: "fieldName: error message" or "parentField.childField: error message"
    const match = errorMessage.match(/^([^:]+):\s*(.+)$/);
    if (match) {
      return {
        field: match[1].trim(),
        message: match[2].trim(),
      };
    }
    return null;
  };
  
  // Helper to set field error and show notification
  const handleError = (errorMessage: string) => {
    const parsed = parseFieldError(errorMessage);
    if (parsed) {
      // Set field-level error
      setFieldErrors((prev) => ({ ...prev, [parsed.field]: parsed.message }));
      // Show notification
      showNotification(errorMessage, 'error');
    } else {
      // Generic error
      showNotification(errorMessage, 'error');
    }
  };
  
  // Helper to clear field error
  const clearFieldError = (fieldName: string) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };
  
  // Helper to get error styling for a field
  const getFieldErrorStyle = (fieldName: string): React.CSSProperties => {
    if (fieldErrors[fieldName]) {
      return {
        borderColor: '#dc2626',
        borderWidth: '2px',
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(220, 38, 38, 0.1) 10px,
          rgba(220, 38, 38, 0.1) 20px
        )`,
        backgroundSize: '20px 20px',
      };
    }
    return {};
  };

  useEffect(() => {
    fetchClients();
    fetchPlans();
  }, []);

  // Auto-calculate invoice due date based on selected month/year (last day of month)
  useEffect(() => {
    if (invoiceGenerateData.month && invoiceGenerateData.year) {
      const lastDay = new Date(invoiceGenerateData.year, invoiceGenerateData.month, 0);
      setInvoiceGenerateData((prev) => ({
        ...prev,
        dueDate: lastDay.toISOString().split('T')[0],
      }));
    }
  }, [invoiceGenerateData.month, invoiceGenerateData.year]);

  // Auto-calculate contract end date based on duration and deal closed date
  useEffect(() => {
    const months = formData.paymentDetails.numberOfMonths;
    const start = formData.paymentDetails.dealClosedDate;
    if (months && months > 0 && start) {
      const startDate = new Date(start);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + months);
      setDerivedEndDate(endDate.toISOString().split('T')[0]);
    } else {
      setDerivedEndDate('');
    }
  }, [formData.paymentDetails.numberOfMonths, formData.paymentDetails.dealClosedDate]);

  // Apply search filter when searchTerm or clients change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredClients(clients);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = clients.filter(client => 
      client.businessName.toLowerCase().includes(term) ||
      client.pointOfContactName.toLowerCase().includes(term) ||
      client.pointOfContactEmail.toLowerCase().includes(term) ||
      (client.pointOfContactTitle && client.pointOfContactTitle.toLowerCase().includes(term))
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const fetchClients = async () => {
    try {
      // Add timestamp to bypass cache and ensure fresh data
      const response = await fetch(`/api/admin/clients?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      
      // Force React to recognize the state change by creating a new array
      const clientsList = data.clients || [];
      
      // Set clients state
      setClients([...clientsList]);
      setFilteredClients([...clientsList]);
    } catch (err: any) {
      showNotification(`Failed to load clients: ${err.message || 'Unknown error'}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/admin/plans');
      if (!response.ok) {
        console.error('Failed to fetch plans:', response.status, response.statusText);
        return;
      }
      const data = await response.json();
      if (data.success && data.plans) {
        setPlans(data.plans || []);
      } else {
        console.error('Invalid plans response:', data);
      }
    } catch (err: any) {
      console.error('Failed to fetch plans:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError(null);

    // Clear previous field errors
    setFieldErrors({});
    
    // Validate main contact email
    const emailValidationError = validateEmail(formData.pointOfContactEmail);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      handleError(`pointOfContactEmail: ${emailValidationError}`);
      return;
    }

    // Validate additional emails
    for (let i = 0; i < formData.additionalEmails.length; i++) {
      const email = formData.additionalEmails[i];
      const validationError = validateEmail(email);
      if (validationError) {
        handleError(`additionalEmails[${i}]: ${validationError}`);
        return;
      }
    }

    try {
      const url = editingClient
        ? `/api/admin/clients/${editingClient._id}`
        : '/api/admin/clients';
      const method = editingClient ? 'PUT' : 'POST';

      const payload: any = {
        businessName: formData.businessName,
        pointOfContactName: formData.pointOfContactName,
        pointOfContactTitle: formData.pointOfContactTitle,
        pointOfContactEmail: formData.pointOfContactEmail,
        additionalEmails: formData.additionalEmails,
        ...(formData.pointOfContactPhone && { pointOfContactPhone: formData.pointOfContactPhone }),
        ...(formData.websiteAddress && { websiteAddress: formData.websiteAddress }),
        ...(formData.country && { country: formData.country }),
        fullRegisteredAddress: formData.fullRegisteredAddress,
        currentPlanId: formData.currentPlanId === 'OTHER' ? null : (formData.currentPlanId || null),
        customPlanName: formData.currentPlanId === 'OTHER' ? formData.customPlanName : undefined,
        planType: formData.planType,
        pricePerLicense: formData.pricePerLicense,
        currency: formData.currency,
        numberOfLicenses: formData.numberOfLicenses,
        ...(formData.numberOfSdrs && formData.numberOfSdrs > 0 && { numberOfSdrs: formData.numberOfSdrs }),
        positiveResponsesTarget: formData.positiveResponsesTarget || 0,
        meetingsBookedTarget: formData.meetingsBookedTarget || 0,
      };

      // For new clients, include licenses
      if (!editingClient) {
        payload.licenses = formData.licenses;
      }

      // Add discount percentage
      if (formData.discountPercentage !== undefined) {
        payload.discountPercentage = Math.max(0, Math.min(100, formData.discountPercentage || 0));
      }
      
      // Always include payment details (even if empty) so they can be updated
      // Note: amountRequested is deprecated - calculated automatically from licenses and discount
      // Convert date input (YYYY-MM-DD) to ISO datetime format (YYYY-MM-DDTHH:mm:ssZ)
      let dealClosedDateISO = undefined;
      if (formData.paymentDetails.dealClosedDate) {
        // Date input gives YYYY-MM-DD, convert to ISO datetime (start of day in UTC)
        const date = new Date(formData.paymentDetails.dealClosedDate + 'T00:00:00Z');
        dealClosedDateISO = date.toISOString();
      }
      
      payload.paymentDetails = {
        numberOfMonths: formData.paymentDetails.numberOfMonths || 1,
        paymentTerms: formData.paymentDetails.paymentTerms || '',
        ...(dealClosedDateISO && { dealClosedDate: dealClosedDateISO }),
        notes: formData.paymentDetails.notes || '',
      };

      // Debug: Log payload for editing
      if (editingClient) {
        console.log('Updating client with payload:', payload);
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Update failed:', data);
        const errorMessage = data.error || 'Failed to save client';
        handleError(errorMessage);
        throw new Error(errorMessage);
      }

      // Store editing client ID before clearing it
      const updatedClientId = editingClient?._id;
      
      // Close form first to show the updated list
      setShowForm(false);
      const wasEditing = !!editingClient;
      setEditingClient(null);
      resetForm();
      setError('');
      
      // Refresh the clients list to get updated data
      await fetchClients();
      
      // Show success message
      const successMessage = wasEditing ? 'Client updated successfully!' : 'Client created successfully!';
      showNotification(successMessage, 'success');
    } catch (err: any) {
      // Error already shown as alert above, just log for debugging
      console.error('Client save error:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      businessName: '',
      pointOfContactName: '',
      pointOfContactTitle: '',
      pointOfContactEmail: '',
      additionalEmails: [],
      pointOfContactPhone: '',
      websiteAddress: '',
      country: '',
      fullRegisteredAddress: '',
      currentPlanId: '',
      customPlanName: '',
      planType: 'REGULAR',
      pricePerLicense: 0,
      currency: 'USD',
      discountPercentage: 0,
      licenses: [],
      numberOfLicenses: 0,
      numberOfSdrs: 0,
      positiveResponsesTarget: 0,
      meetingsBookedTarget: 0,
      paymentDetails: {
        numberOfMonths: 1,
        paymentTerms: '',
        dealClosedDate: '',
        notes: '',
      },
    });
    setAdditionalEmailInput('');
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    const clientWithPayment = client as any;
    setFormData({
      businessName: client.businessName,
      pointOfContactName: client.pointOfContactName,
      pointOfContactTitle: client.pointOfContactTitle || '',
      pointOfContactEmail: client.pointOfContactEmail,
      additionalEmails: client.additionalEmails || [],
      pointOfContactPhone: client.pointOfContactPhone || '',
      websiteAddress: client.websiteAddress || '',
      country: client.country || '',
      fullRegisteredAddress: client.fullRegisteredAddress,
      currentPlanId: client.currentPlanId?._id || '',
      customPlanName: clientWithPayment.customPlanName || '',
      planType: clientWithPayment.planType || 'REGULAR',
      pricePerLicense: clientWithPayment.pricePerLicense || 0,
      currency: clientWithPayment.currency || 'USD',
      discountPercentage: clientWithPayment.discountPercentage || 0,
      licenses: [],
      numberOfLicenses: clientWithPayment.numberOfLicenses || 0,
      numberOfSdrs: clientWithPayment.numberOfSdrs || 0,
      positiveResponsesTarget: clientWithPayment.positiveResponsesTarget || 0,
      meetingsBookedTarget: clientWithPayment.meetingsBookedTarget || 0,
      paymentDetails: clientWithPayment.paymentDetails ? {
        numberOfMonths: clientWithPayment.paymentDetails.numberOfMonths || 1,
        paymentTerms: clientWithPayment.paymentDetails.paymentTerms || '',
        dealClosedDate: clientWithPayment.paymentDetails.dealClosedDate 
          ? new Date(clientWithPayment.paymentDetails.dealClosedDate).toISOString().split('T')[0]
          : '',
        notes: clientWithPayment.paymentDetails.notes || '',
      } : {
        numberOfMonths: 1,
        paymentTerms: '',
        dealClosedDate: '',
        notes: '',
      },
    });
    setShowForm(true);
  };


  const handleInvoiceGenerate = async (clientId: string, e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('[Client Page] ===== INVOICE GENERATION HANDLER CALLED =====');
    console.log('[Client Page] Client ID:', clientId);
    console.log('[Client Page] Invoice Generate Data:', invoiceGenerateData);
    
    if (!invoiceGenerateData.month || !invoiceGenerateData.year) {
      console.error('[Client Page] Validation failed: Missing month or year');
      showNotification('Please select month and year', 'error');
      return;
    }

    if (!clientId) {
      console.error('[Client Page] Validation failed: Missing client ID');
      showNotification('Client ID is missing', 'error');
      return;
    }

    console.log('[Client Page] Starting invoice generation...');
    setGeneratingInvoice(true);
    setError('');

    try {
      const payload: any = {
        month: invoiceGenerateData.month,
        year: invoiceGenerateData.year,
      };

      // Add optional fields if provided
      if (invoiceGenerateData.amountOverride) {
        payload.amountOverride = parseFloat(invoiceGenerateData.amountOverride);
      }
      if (invoiceGenerateData.description) {
        payload.description = invoiceGenerateData.description;
      }
      if (invoiceGenerateData.dueDate) {
        payload.dueDate = invoiceGenerateData.dueDate;
      }
      if (invoiceGenerateData.invoiceDate) {
        payload.invoiceDate = invoiceGenerateData.invoiceDate;
      }
      if (invoiceGenerateData.invoiceNumber) {
        payload.invoiceNumber = invoiceGenerateData.invoiceNumber;
      }
      if (invoiceGenerateData.paymentTerms) {
        payload.paymentTerms = invoiceGenerateData.paymentTerms;
      }

      console.log('[Client Page] Sending invoice generation request:', {
        clientId,
        payload,
      });

      const response = await fetch(`/api/admin/clients/${clientId}/invoice/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('[Client Page] Invoice generation response status:', response.status);

      const data = await response.json();
      console.log('[Client Page] Invoice generation response data:', data);

      if (!response.ok) {
        console.error('[Client Page] Invoice generation failed:', data);
        throw new Error(data.error || 'Failed to generate invoice');
      }

      setInvoiceGenerateData({ 
        month: new Date().getMonth() + 1, 
        year: new Date().getFullYear(),
        amountOverride: '',
        description: '',
        dueDate: '',
        invoiceDate: '',
        invoiceNumber: '',
        paymentTerms: '',
        notes: '',
      });
      setError('');
      console.log('[Client Page] Invoice generated successfully!');
      alert('Invoice generated successfully!');
      
      // Refresh invoices list if we're on the invoices page
      if (window.location.pathname.includes('/invoices')) {
        window.location.reload();
      }
      
      await fetchClients();
    } catch (err: any) {
      console.error('[Client Page] Invoice generation error:', err);
      console.error('[Client Page] Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name,
      });
      showNotification(`Failed to generate invoice: ${err.message || 'Unknown error'}`, 'error');
    } finally {
      console.log('[Client Page] Invoice generation handler finished');
      setGeneratingInvoice(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/clients/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete client');
      }

      await fetchClients();
    } catch (err: any) {
      showNotification(`Failed to delete client: ${err.message || 'Unknown error'}`, 'error');
    }
  };

  const handleCreateAccount = async (clientId: string, e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accountFormData.name || !accountFormData.email || !accountFormData.password) {
      showNotification('Name, email, and password are required', 'error');
      return;
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: accountFormData.name,
          email: accountFormData.email,
          password: accountFormData.password,
          role: 'CLIENT',
          clientId: clientId,
          isActive: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create login account');
      }

      setShowCreateAccount(null);
      setAccountFormData({ name: '', email: '', password: '' });
      setError('');
      alert('Login account created successfully!');
    } catch (err: any) {
      showNotification(`Failed to create login account: ${err.message || 'Unknown error'}`, 'error');
    }
  };

  const addAdditionalEmail = () => {
    if (!additionalEmailInput) {
      setAdditionalEmailError('Email is required');
      return;
    }

    const validationError = validateEmail(additionalEmailInput);
    if (validationError) {
      setAdditionalEmailError(validationError);
      return;
    }

    // Check if email already exists in the list
    if (formData.additionalEmails.includes(additionalEmailInput.trim().toLowerCase())) {
      setAdditionalEmailError('This email is already in the list');
      return;
    }

      setFormData({
        ...formData,
      additionalEmails: [...formData.additionalEmails, additionalEmailInput.trim().toLowerCase()],
      });
      setAdditionalEmailInput('');
    setAdditionalEmailError(null);
  };

  const removeAdditionalEmail = (index: number) => {
    setFormData({
      ...formData,
      additionalEmails: formData.additionalEmails.filter((_, i) => i !== index),
    });
  };

  const addLicense = () => {
    setFormData({
      ...formData,
      licenses: [...formData.licenses, { productOrServiceName: '', serviceType: '', label: '' }],
    });
  };

  const updateLicense = (index: number, field: keyof LicenseInput, value: string) => {
    const updatedLicenses = [...formData.licenses];
    updatedLicenses[index] = { ...updatedLicenses[index], [field]: value };
    setFormData({ ...formData, licenses: updatedLicenses });
  };

  const removeLicense = (index: number) => {
    setFormData({
      ...formData,
      licenses: formData.licenses.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <NotificationContainer notifications={notifications} onDismiss={dismissNotification} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <LogoComponent width={48} height={26} hoverGradient={true} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--imperial-emerald)' }}>
          Clients Management
        </h1>
          <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
            Manage all client accounts and information
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingClient(null);
            resetForm();
          }}
          className="btn-primary"
        >
          + Create Client
        </button>
      </div>

      {/* Error messages now shown as pop-up alerts instead of banners */}

      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            overflow: 'auto'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowForm(false);
              setEditingClient(null);
              resetForm();
            }
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '90vw',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              margin: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--imperial-emerald)' }}>
                {editingClient ? 'Edit Client' : 'Create New Client'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingClient(null);
                  resetForm();
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--muted-jade)',
                  padding: '0.25rem 0.5rem',
                  lineHeight: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--imperial-emerald)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted-jade)';
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
            {/* Client Information Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
                Client Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.pointOfContactName}
                    onChange={(e) => setFormData({ ...formData, pointOfContactName: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Contact Title
                  </label>
                  <input
                    type="text"
                    value={formData.pointOfContactTitle}
                    onChange={(e) => setFormData({ ...formData, pointOfContactTitle: e.target.value })}
                    className="input"
                    placeholder="e.g., CEO, VP of Sales"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    value={formData.pointOfContactEmail}
                    onChange={(e) => {
                      const email = e.target.value;
                      setFormData({ ...formData, pointOfContactEmail: email });
                      // Real-time validation
                      const validationError = validateEmail(email);
                      setEmailError(validationError);
                    }}
                    onBlur={(e) => {
                      // Validate on blur as well
                      const validationError = validateEmail(e.target.value);
                      setEmailError(validationError);
                    }}
                    className="input"
                    required
                  />
                  {emailError && (
                    <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                      {emailError}
                    </p>
                  )}
                  {!emailError && formData.pointOfContactEmail && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                      ✓ Valid email format
                    </p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Additional Emails
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                      type="email"
                      value={additionalEmailInput}
                      onChange={(e) => {
                        const email = e.target.value;
                        setAdditionalEmailInput(email);
                        // Real-time validation
                        if (email) {
                          const validationError = validateEmail(email);
                          setAdditionalEmailError(validationError);
                        } else {
                          setAdditionalEmailError(null);
                        }
                      }}
                      onBlur={(e) => {
                        // Validate on blur as well
                        if (e.target.value) {
                          const validationError = validateEmail(e.target.value);
                          setAdditionalEmailError(validationError);
                        } else {
                          setAdditionalEmailError(null);
                        }
                      }}
                      className="input"
                      placeholder="Add email for dashboard access"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addAdditionalEmail();
                        }
                      }}
                    />
                    {additionalEmailError && (
                      <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                        {additionalEmailError}
                      </p>
                    )}
                    {!additionalEmailError && additionalEmailInput && (
                      <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                        ✓ Valid email format - Press Enter or click Add to include
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={addAdditionalEmail}
                      className="btn-secondary"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Add
                    </button>
                  </div>
                  {formData.additionalEmails.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {formData.additionalEmails.map((email, idx) => (
                        <span
                          key={idx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.25rem 0.75rem',
                            background: 'rgba(196, 183, 91, 0.1)',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            color: 'var(--imperial-emerald)'
                          }}
                        >
                          {email}
                          <button
                            type="button"
                            onClick={() => removeAdditionalEmail(idx)}
                            style={{ cursor: 'pointer', color: '#dc2626' }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.pointOfContactPhone}
                    onChange={(e) => setFormData({ ...formData, pointOfContactPhone: e.target.value })}
                    className="input"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Website Address
                  </label>
                  <input
                    type="url"
                    value={formData.websiteAddress}
                    onChange={(e) => setFormData({ ...formData, websiteAddress: e.target.value })}
                    className="input"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="input"
                    placeholder="e.g., United States"
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Full Registered Address *
                  </label>
                  <textarea
                    value={formData.fullRegisteredAddress}
                    onChange={(e) => setFormData({ ...formData, fullRegisteredAddress: e.target.value })}
                    className="input"
                    required
                    rows={3}
                    placeholder="Complete registered business address"
                  />
                </div>
              </div>
            </div>

            {/* Service & Plan Information Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
                Service & Plan Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Plan Chosen *
                  </label>
                  <select
                    value={formData.currentPlanId}
                    onChange={(e) => {
                      const selectedPlanId = e.target.value;
                      const selectedPlan = plans.find(p => p._id === selectedPlanId);
                      
                      // Auto-populate fields from plan configuration
                      if (selectedPlan && selectedPlan.planConfiguration) {
                        const config = selectedPlan.planConfiguration;
                        const updates: any = {
                          currentPlanId: selectedPlanId,
                          customPlanName: selectedPlanId === 'OTHER' ? formData.customPlanName : '',
                        };
                        
                        // Auto-populate price per license if plan has it
                        if (config.pricePerLicense) {
                          updates.pricePerLicense = config.pricePerLicense;
                        }
                        
                        // Auto-populate price per SDR if plan has it
                        if (config.pricePerSdr && config.requiresSdrCount) {
                          // For SDR plans, we'll use pricePerSdr for calculation
                          updates.pricePerLicense = config.pricePerSdr;
                        }
                        
                        // Reset SDR count if switching away from SDR plan
                        if (!config.requiresSdrCount) {
                          updates.numberOfSdrs = 0;
                        }
                        
                        setFormData({ ...formData, ...updates });
                      } else {
                        setFormData({ ...formData, currentPlanId: selectedPlanId, customPlanName: selectedPlanId === 'OTHER' ? formData.customPlanName : '' });
                      }
                    }}
                    className="input"
                    required
                  >
                    <option value="">Select a plan</option>
                    {plans.map((plan) => {
                      // Format pricing based on plan type
                      let priceDisplay = '';
                      if (plan.name === 'LinkedIn Outreach Excellence 20X') {
                        priceDisplay = `$${plan.pricePerMonth}/license`;
                      } else if (plan.name === 'LinkedIn Followers Boost') {
                        priceDisplay = `$${plan.pricePerMonth}/month`;
                      } else if (plan.name === 'SDR as a Service') {
                        priceDisplay = `$${plan.pricePerMonth}/month`;
                      } else {
                        priceDisplay = `$${plan.pricePerMonth}/month`;
                      }
                      return (
                        <option key={plan._id} value={plan._id}>
                          {plan.name} - {priceDisplay}
                        </option>
                      );
                    })}
                    <option value="OTHER">Other (Custom Plan Name)</option>
                  </select>
                  {plans.length === 0 && (
                    <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                      ⚠️ No plans found. Please run the seed script to create plans first.
                    </p>
                  )}
                  {formData.currentPlanId === 'OTHER' && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <input
                        type="text"
                        value={formData.customPlanName}
                        onChange={(e) => setFormData({ ...formData, customPlanName: e.target.value })}
                        className="input"
                        placeholder="Enter custom plan name"
                        required={formData.currentPlanId === 'OTHER'}
                      />
                    </div>
                  )}
                  {formData.currentPlanId && formData.currentPlanId !== 'OTHER' && (
                    <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(196, 183, 91, 0.1)', borderRadius: '0.375rem' }}>
                      {(() => {
                        const selectedPlan = plans.find(p => p._id === formData.currentPlanId);
                        if (selectedPlan) {
                          return (
                            <div style={{ fontSize: '0.875rem', color: 'var(--muted-jade)' }}>
                              <p style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
                                {selectedPlan.name}
                              </p>
                              <p style={{ marginBottom: '0.25rem' }}>
                                {selectedPlan.description}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Plan Type *
                  </label>
                  <select
                    value={formData.planType}
                    onChange={(e) => setFormData({ ...formData, planType: e.target.value as 'REGULAR' | 'POC' })}
                    className="input"
                    required
                  >
                    <option value="REGULAR">Regular</option>
                    <option value="POC">POC</option>
                  </select>
                </div>
                {(() => {
                  const selectedPlan = plans.find(p => p._id === formData.currentPlanId);
                  const requiresSdrCount = selectedPlan?.planConfiguration?.requiresSdrCount;
                  
                  if (requiresSdrCount) {
                    // Show SDR count input for SDR as a Service
                    return (
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Number of SDRs *
                        </label>
                        <input
                          type="number"
                          value={formData.numberOfSdrs || ''}
                          onChange={(e) => setFormData({ ...formData, numberOfSdrs: parseInt(e.target.value) || 0 })}
                          className="input"
                          min="1"
                          max="10"
                          placeholder="Enter number of SDRs"
                          required
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                          Enter the number of SDRs (1-10)
                        </p>
                      </div>
                    );
                  } else {
                    // Show license count input for other plans
                    return (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Number of Licenses *
                  </label>
                  <input
                    type="number"
                    value={formData.numberOfLicenses || ''}
                    onChange={(e) => setFormData({ ...formData, numberOfLicenses: parseInt(e.target.value) || 0 })}
                    className="input"
                    min="1"
                    max="999"
                    placeholder="Enter number of licenses"
                    required
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                    Enter the number of licenses (1-999)
                  </p>
                </div>
                    );
                  }
                })()}
                {(() => {
                  const selectedPlan = plans.find(p => p._id === formData.currentPlanId);
                  const fixedPrice = selectedPlan?.planConfiguration?.fixedPrice;
                  const requiresSdrCount = selectedPlan?.planConfiguration?.requiresSdrCount;
                  const label = requiresSdrCount ? 'Price Per SDR *' : 'Price Per License *';
                  
                  return (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        {label}
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value as 'USD' | 'INR' })}
                      className="input"
                      style={{ width: '100px', flexShrink: 0 }}
                    required
                          disabled={fixedPrice}
                    >
                      <option value="USD">USD</option>
                      <option value="INR">INR</option>
                    </select>
                    <input
                      type="number"
                      value={formData.pricePerLicense}
                      onChange={(e) => setFormData({ ...formData, pricePerLicense: parseFloat(e.target.value) || 0 })}
                      className="input"
                      min="0"
                      step="0.01"
                      required
                      placeholder="0.00"
                      style={{ flex: 1 }}
                          disabled={fixedPrice}
                          readOnly={fixedPrice}
                    />
                  </div>
                      {fixedPrice && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                          Price is fixed from plan configuration
                        </p>
                      )}
                </div>
                  );
                })()}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPercentage || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      discountPercentage: Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)),
                    })}
                    className="input"
                    placeholder="0"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                    Optional discount percentage (0-100%). Leave empty for no discount.
                  </p>
                </div>
                <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                  <div style={{ padding: '1.25rem', background: 'rgba(196, 183, 91, 0.1)', borderRadius: '0.5rem', border: '2px solid var(--golden-opal)' }}>
                    {(() => {
                      const selectedPlan = plans.find(p => p._id === formData.currentPlanId);
                      const requiresSdrCount = selectedPlan?.planConfiguration?.requiresSdrCount;
                      
                      // Calculate base cost based on plan type
                      let baseCost = 0;
                      let costDescription = '';
                      
                      if (requiresSdrCount) {
                        // SDR-based: numberOfSdrs × pricePerLicense (which is pricePerSdr)
                        baseCost = (formData.numberOfSdrs || 0) * formData.pricePerLicense;
                        costDescription = `${formData.numberOfSdrs || 0} SDRs × ${formData.currency} ${formData.pricePerLicense.toFixed(2)}`;
                      } else {
                        // License-based: numberOfLicenses × pricePerLicense
                        baseCost = formData.numberOfLicenses * formData.pricePerLicense;
                        costDescription = `${formData.numberOfLicenses} licenses × ${formData.currency} ${formData.pricePerLicense.toFixed(2)}`;
                      }
                      
                      const discountPercent = formData.discountPercentage || 0;
                      const discountAmount = baseCost > 0 && discountPercent > 0 ? (baseCost * discountPercent) / 100 : 0;
                      const finalCost = baseCost - discountAmount;
                      
                      return (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: discountPercent > 0 ? '0.75rem' : '0' }}>
                            <span style={{ fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '0.95rem' }}>Base Cost:</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--imperial-emerald)' }}>
                              {formData.currency} {baseCost.toFixed(2)}
                            </span>
                          </div>
                          {discountPercent > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', color: '#ef4444' }}>
                              <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Discount ({discountPercent}%):</span>
                              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                -{formData.currency} {discountAmount.toFixed(2)}
                              </span>
                            </div>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: discountPercent > 0 ? '0.75rem' : '0', borderTop: discountPercent > 0 ? '2px solid var(--golden-opal)' : 'none' }}>
                            <span style={{ fontWeight: '600', color: 'var(--imperial-emerald)', fontSize: '1rem' }}>Total Cost of Service:</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--golden-opal)' }}>
                              {formData.currency} {finalCost.toFixed(2)}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginTop: '0.75rem', fontStyle: 'italic' }}>
                            {costDescription}
                            {discountPercent > 0 && ` - ${discountPercent}% discount`} = {formData.currency} {finalCost.toFixed(2)}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Target Configuration Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
                Target Configuration
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                Set targets for SDR performance tracking. SDRs must report these values daily.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
                    Number of Positive Responses
                  </label>
                  <input
                    type="number"
                    value={formData.positiveResponsesTarget || ''}
                    onChange={(e) => setFormData({ ...formData, positiveResponsesTarget: parseInt(e.target.value) || 0 })}
                    className="input"
                    min="0"
                    placeholder="0"
                    style={{ fontSize: '0.875rem' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                    Target number of positive responses
                  </p>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--imperial-emerald)' }}>
                    Number of Meetings Booked
                  </label>
                  <input
                    type="number"
                    value={formData.meetingsBookedTarget || ''}
                    onChange={(e) => setFormData({ ...formData, meetingsBookedTarget: parseInt(e.target.value) || 0 })}
                    className="input"
                    min="0"
                    placeholder="0"
                    style={{ fontSize: '0.875rem' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                    Target number of meetings booked
                  </p>
                </div>
              </div>
            </div>

              {/* Licenses Section */}
              {!editingClient && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: '500' }}>
                      Licenses Issued
                    </label>
                    <button
                      type="button"
                      onClick={addLicense}
                      className="btn-secondary"
                      style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                    >
                      + Add License
                    </button>
                  </div>
                  {formData.licenses.length === 0 && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '1rem', fontStyle: 'italic' }}>
                      No licenses added. Click &quot;Add License&quot; to add one.
                    </p>
                  )}
                  {formData.licenses.map((license, index) => (
                    <div key={index} className="card" style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(196, 183, 91, 0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <strong style={{ color: 'var(--imperial-emerald)' }}>License #{index + 1}</strong>
                        <button
                          type="button"
                          onClick={() => removeLicense(index)}
                          style={{ color: '#dc2626', cursor: 'pointer', fontSize: '1.25rem' }}
                        >
                          ×
                        </button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Product or Service Name *
                          </label>
                          <input
                            type="text"
                            value={license.productOrServiceName}
                            onChange={(e) => updateLicense(index, 'productOrServiceName', e.target.value)}
                            className="input"
                            required
                            placeholder="e.g., LinkedIn Outreach Excellence 20X"
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Service Type *
                          </label>
                          <input
                            type="text"
                            value={license.serviceType}
                            onChange={(e) => updateLicense(index, 'serviceType', e.target.value)}
                            className="input"
                            required
                            placeholder="e.g., LinkedIn Outreach, Email Campaign"
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            License Label *
                          </label>
                          <input
                            type="text"
                            value={license.label}
                            onChange={(e) => updateLicense(index, 'label', e.target.value)}
                            className="input"
                            required
                            placeholder="e.g., LinkedIn Premium, Email Pro"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {/* Payment Information Section */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
                Payment Information & Deal Details
              </h3>
              <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Payment amount is calculated automatically from licenses and discount. Payments are tracked month-wise through invoices.
              </p>
              
              {/* Contract Duration and End Date */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Contract Duration (Months) *
                    </label>
                    <input
                      type="number"
                      value={formData.paymentDetails.numberOfMonths || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentDetails: {
                          ...formData.paymentDetails,
                          numberOfMonths: parseInt(e.target.value) || 1,
                        },
                      })}
                      className="input"
                      placeholder="1"
                      min="1"
                      required
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                      Number of months for this contract/engagement
                    </p>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Deal Closed Date (Start)
                    </label>
                    <input
                      type="date"
                      value={formData.paymentDetails.dealClosedDate || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          paymentDetails: {
                            ...formData.paymentDetails,
                            dealClosedDate: e.target.value,
                          },
                        });
                        // Clear error when user starts typing
                        clearFieldError('paymentDetails.dealClosedDate');
                      }}
                      className="input"
                      style={{
                        ...(fieldErrors['paymentDetails.dealClosedDate'] && {
                          borderColor: '#dc2626',
                          borderWidth: '2px',
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(220, 38, 38, 0.1) 10px,
                            rgba(220, 38, 38, 0.1) 20px
                          )`,
                          backgroundSize: '20px 20px',
                        }),
                      }}
                      title={fieldErrors['paymentDetails.dealClosedDate'] || ''}
                    />
                    {fieldErrors['paymentDetails.dealClosedDate'] ? (
                      <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem', fontWeight: '500' }}>
                        ⚠️ {fieldErrors['paymentDetails.dealClosedDate']}
                      </p>
                    ) : (
                      <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                        Date when the deal was closed/signed
                      </p>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      End Date (Auto)
                    </label>
                    <input
                      type="date"
                      value={derivedEndDate || ''}
                      readOnly
                      className="input"
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                      Automatically calculated from start date + duration
                    </p>
                  </div>
                </div>
            </div>
                
            {/* Invoice Generation Section */}
            {editingClient && (
              <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(11,46,43,0.05)', borderRadius: '0.5rem', border: '1px solid rgba(196, 183, 91, 0.2)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--imperial-emerald)', borderBottom: '2px solid var(--golden-opal)', paddingBottom: '0.5rem' }}>
                  Generate Monthly Invoice
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-jade)', marginBottom: '1.25rem' }}>
                  Generate invoice PDF for a specific month. Invoice will be automatically calculated based on client plan, licenses, and SDRs.
                </p>
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Month *
                          </label>
                          <select
                            value={invoiceGenerateData.month}
                            onChange={(e) => setInvoiceGenerateData({ ...invoiceGenerateData, month: parseInt(e.target.value) })}
                            className="input"
                            required
                          >
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Year *
                          </label>
                          <input
                            type="number"
                            value={invoiceGenerateData.year}
                            onChange={(e) => setInvoiceGenerateData({ ...invoiceGenerateData, year: parseInt(e.target.value) })}
                            className="input"
                            min="2020"
                            max="2100"
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Invoice Date (Optional)
                          </label>
                          <input
                            type="date"
                            value={invoiceGenerateData.invoiceDate}
                            onChange={(e) => setInvoiceGenerateData({ ...invoiceGenerateData, invoiceDate: e.target.value })}
                            className="input"
                          />
                          <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                            Defaults to first day of month if not specified
                          </p>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Due Date (Optional)
                          </label>
                          <input
                            type="date"
                            value={invoiceGenerateData.dueDate}
                            onChange={(e) => setInvoiceGenerateData({ ...invoiceGenerateData, dueDate: e.target.value })}
                            className="input"
                          />
                          <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                            Defaults to last day of month if not specified
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Invoice Number (Optional)
                          </label>
                          <input
                            type="text"
                            value={invoiceGenerateData.invoiceNumber}
                            onChange={(e) => setInvoiceGenerateData({ ...invoiceGenerateData, invoiceNumber: e.target.value })}
                            className="input"
                            placeholder="Auto-generated if not provided"
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Amount Override (Optional)
                          </label>
                          <input
                            type="number"
                            value={invoiceGenerateData.amountOverride}
                            onChange={(e) => setInvoiceGenerateData({ ...invoiceGenerateData, amountOverride: e.target.value })}
                            className="input"
                            step="0.01"
                            min="0"
                            placeholder="Override calculated amount"
                          />
                          <p style={{ fontSize: '0.75rem', color: 'var(--muted-jade)', marginTop: '0.25rem' }}>
                            Leave empty to use calculated amount
                          </p>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                            Payment Terms (Optional)
                          </label>
                          <input
                            type="text"
                            value={invoiceGenerateData.paymentTerms}
                            onChange={(e) => setInvoiceGenerateData({ ...invoiceGenerateData, paymentTerms: e.target.value })}
                            className="input"
                            placeholder="e.g., Net 30, Due on receipt"
                          />
                        </div>
                      </div>
                      <div style={{ marginBottom: '0.75rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                          Description (Optional)
                        </label>
                        <textarea
                          value={invoiceGenerateData.description}
                          onChange={(e) => setInvoiceGenerateData({ ...invoiceGenerateData, description: e.target.value })}
                          className="input"
                          rows={2}
                          placeholder="Custom service description (overrides auto-generated)"
                        />
                      </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.preventDefault();
                        
                        if (!editingClient?._id) {
                          alert('Error: No client selected. Please edit a client first.');
                          return;
                        }
                        
                        if (!invoiceGenerateData.month || !invoiceGenerateData.year) {
                          alert('Please select both month and year');
                          return;
                        }
                        
                        await handleInvoiceGenerate(editingClient._id, e);
                      }}
                      className="btn-primary"
                      disabled={generatingInvoice || !editingClient?._id}
                      style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                    >
                      {generatingInvoice ? 'Generating...' : 'Generate Invoice'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInvoiceGenerateData({ 
                          month: new Date().getMonth() + 1, 
                          year: new Date().getFullYear(),
                          amountOverride: '',
                          description: '',
                          dueDate: '',
                          invoiceDate: '',
                          invoiceNumber: '',
                          paymentTerms: '',
                          notes: '',
                        });
                      }}
                      className="btn-secondary"
                      style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem', flexDirection: 'column' }}>
                {editingClient && (
                  <button
                    type="button"
                    onClick={() => setShowCreateAccount(editingClient._id)}
                    className="btn-secondary"
                    style={{
                      background: 'rgba(196, 183, 91, 0.1)',
                      borderColor: 'var(--golden-opal)',
                      color: 'var(--imperial-emerald)',
                      alignSelf: 'flex-start'
                    }}
                  >
                    <UserPlus size={16} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
                    Create Account
                  </button>
                )}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn-primary">
                    {editingClient ? 'Update Client' : 'Create Client'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingClient(null);
                      resetForm();
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  {editingClient && (
                    <button
                      type="button"
                      onClick={() => handleDelete(editingClient._id)}
                      className="btn-secondary"
                      style={{
                        background: '#fee2e2',
                        borderColor: '#dc2626',
                        color: '#dc2626'
                      }}
                    >
                      <Trash2 size={16} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
                      Delete Client
                    </button>
                  )}
                </div>
              </div>

              {/* Account creation - shown inside modal when editing */}
              {editingClient && (
                <>
                  {showCreateAccount === editingClient._id && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(196, 183, 91, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(196, 183, 91, 0.3)' }}>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--imperial-emerald)' }}>
                        Create Login Account for {editingClient.businessName}
                      </h4>
                      <form onSubmit={(e) => handleCreateAccount(editingClient._id, e)}>
                        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                              Name *
                            </label>
                            <input
                              type="text"
                              value={accountFormData.name}
                              onChange={(e) => setAccountFormData({ ...accountFormData, name: e.target.value })}
                              className="input"
                              required
                              placeholder={editingClient.pointOfContactName}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                              Email *
                            </label>
                            <input
                              type="email"
                              value={accountFormData.email}
                              onChange={(e) => setAccountFormData({ ...accountFormData, email: e.target.value })}
                              className="input"
                              required
                              placeholder={editingClient.pointOfContactEmail}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}>
                              Password *
                            </label>
                            <input
                              type="password"
                              value={accountFormData.password}
                              onChange={(e) => setAccountFormData({ ...accountFormData, password: e.target.value })}
                              className="input"
                              required
                              minLength={6}
                              placeholder="Minimum 6 characters"
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button type="submit" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                            Create Account
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCreateAccount(null);
                              setAccountFormData({ name: '', email: '', password: '' });
                            }}
                            className="btn-secondary"
                            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--imperial-emerald)' }}>
              Search Clients
            </label>
            <input
              type="text"
              placeholder="Search by business name or email..."
              className="input"
              style={{ width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredClients.length === 0 && clients.length > 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--muted-jade)', fontSize: '1.125rem', marginBottom: '1rem' }}>
            No clients match your search.
          </p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--muted-jade)', fontSize: '1.125rem', marginBottom: '1rem' }}>
            No clients found.
          </p>
          <button onClick={() => {
            setShowForm(true);
            resetForm();
          }} className="btn-primary">
            Create Your First Client
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: '0' }}>
          <div style={{ 
            padding: '1.5rem', 
            borderBottom: '2px solid rgba(196, 183, 91, 0.3)',
            background: 'linear-gradient(135deg, rgba(196, 183, 91, 0.1) 0%, rgba(196, 183, 91, 0.05) 100%)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--imperial-emerald)', fontWeight: '600' }}>
              All Clients
            </h2>
            <p style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
              {filteredClients.length} {filteredClients.length === 1 ? 'client' : 'clients'} {searchTerm ? '(filtered)' : 'total'}
            </p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ 
                  background: 'rgba(11, 46, 43, 0.05)',
                  borderBottom: '2px solid rgba(196, 183, 91, 0.3)'
                }}>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Business Name
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Contact
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Licenses
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Final Cost
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center', 
                    fontWeight: '600', 
                    color: 'var(--imperial-emerald)',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr 
                    key={client._id}
                    style={{ 
                      borderBottom: '1px solid rgba(196, 183, 91, 0.15)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleEdit(client)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(196, 183, 91, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.25rem' }}>
                        {client.businessName}
                      </div>
                      {client.country && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>
                          {client.country}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'var(--muted-jade)', fontSize: '0.875rem' }}>
                        <div style={{ fontWeight: '500', marginBottom: '0.125rem' }}>
                          {client.pointOfContactName}
                          {client.pointOfContactTitle && ` (${client.pointOfContactTitle})`}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-jade)' }}>{client.pointOfContactEmail}</div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ 
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        background: 'rgba(196, 183, 91, 0.2)',
                        color: 'var(--imperial-emerald)',
                        fontWeight: '600',
                        fontSize: '0.875rem'
                      }}>
                        {client.numberOfLicenses ?? 0}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      {(() => {
                        const baseCost = (client.numberOfLicenses || 0) * ((client as any).pricePerLicense || 0);
                        const discountPercent = (client as any).discountPercentage || 0;
                        const discountAmount = baseCost > 0 && discountPercent > 0 ? (baseCost * discountPercent) / 100 : 0;
                        const finalCost = baseCost - discountAmount;
                        const currencySymbol = (client as any).currency === 'INR' ? '₹' : '$';
                        
                        if (baseCost > 0) {
                          return (
                            <div style={{ fontSize: '0.875rem' }}>
                              <div style={{ fontWeight: '600', color: 'var(--imperial-emerald)', marginBottom: '0.125rem' }}>
                                {currencySymbol}{finalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                              {discountPercent > 0 && (
                                <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>
                                  {discountPercent}% off
                                </div>
                              )}
                            </div>
                          );
                        }
                        return <span style={{ color: 'var(--muted-jade)', fontSize: '0.875rem', fontStyle: 'italic' }}>—</span>;
                      })()}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleEdit(client)}
                        style={{
                          padding: '0.5rem',
                          border: 'none',
                          background: 'rgba(196, 183, 91, 0.1)',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(196, 183, 91, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(196, 183, 91, 0.1)';
                        }}
                        title="Edit Client"
                      >
                        <Edit size={16} color="var(--imperial-emerald)" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
    </div>
  );
}
