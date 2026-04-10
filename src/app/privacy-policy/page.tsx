import { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | MillionCXO Outreach Pvt. Ltd.',
  description: 'Privacy Policy of MillionCXO Outreach Private Limited — how we collect, use, disclose, and safeguard your personal information.',
}

const tocItems = [
  { href: '#s1', label: '1. Definitions' },
  { href: '#s2', label: '2. Scope and Application' },
  { href: '#s3', label: '3. Information We Collect' },
  { href: '#s4', label: '4. Purposes of Processing' },
  { href: '#s5', label: '5. Legal Basis for Processing' },
  { href: '#s6', label: '6. Disclosure of Information' },
  { href: '#s7', label: '7. International Transfers' },
  { href: '#s8', label: '8. Data Retention' },
  { href: '#s9', label: '9. Cookies and Tracking' },
  { href: '#s10', label: '10. Data Security' },
  { href: '#s11', label: '11. Your Rights' },
  { href: '#s13', label: '12. Amendments' },
  { href: '#s14', label: '13. Governing Law' },
  { href: '#s15', label: '14. Contact and Grievances' },
]

const tocFooterLinks = [
  { href: '/terms-of-service', label: '→ Terms of Service' },
  { href: '/refund-cancellation-policy', label: '→ Refund Policy' },
  { href: '/', label: '← Back to Website' },
]

const contentHtml = `
<div class="preamble">
  <p>This Privacy Policy (<strong>"Policy"</strong>) is issued by <strong>MillionCXO Outreach Private Limited</strong>, a company incorporated under the Companies Act, 2013, having its registered office at 235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indiranagar, Bengaluru – 560038, Karnataka, India (<strong>"Company"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>). This Policy describes how the Company collects, uses, discloses, and safeguards personal information in connection with the operation of <em>www.millioncxo.com</em> and the provision of our B2B sales acceleration services.</p>
</div>

<section class="doc-section" id="s1">
  <div class="section-header"><span class="section-num">§ 01</span><h2>Definitions</h2></div>
  <p class="legal">For the purposes of this Policy, the following terms shall have the meanings ascribed to them below:</p>
  <dl class="definition-block">
    <dt>"Personal Data" or "Personal Information"</dt>
    <dd>Any information that identifies or can reasonably identify a natural person, directly or indirectly, including name, email address, telephone number, location data, and online identifiers.</dd>
    <dt>"Processing"</dt>
    <dd>Any operation performed on Personal Data, including collection, recording, storage, adaptation, retrieval, consultation, use, disclosure, dissemination, erasure, or destruction.</dd>
    <dt>"Data Subject"</dt>
    <dd>Any identified or identifiable natural person whose Personal Data is processed by the Company.</dd>
    <dt>"Client"</dt>
    <dd>Any business entity that has entered into a Service Agreement with the Company for the provision of B2B sales acceleration services.</dd>
    <dt>"Services"</dt>
    <dd>The SDR-as-a-Service, LinkedIn Outreach Excellence, and ancillary B2B outreach services offered by the Company.</dd>
  </dl>
</section>

<section class="doc-section" id="s2">
  <div class="section-header"><span class="section-num">§ 02</span><h2>Scope and Application</h2></div>
  <p class="legal">This Policy applies to:</p>
  <ul class="legal-list">
    <li>All visitors to the Company's website at <em>www.millioncxo.com</em> and any subdomains thereof;</li>
    <li>Prospective clients who interact with the Company through demo requests, contact forms, or direct communications;</li>
    <li>Clients under active or concluded Service Agreements with the Company; and</li>
    <li>Any other individual whose Personal Data is submitted to or collected by the Company in connection with the Services.</li>
  </ul>
  <p class="legal">This Policy does not apply to the data practices of third-party platforms, tools, or service providers referenced herein, each of which is governed by their own privacy policies.</p>
</section>

<section class="doc-section" id="s3">
  <div class="section-header"><span class="section-num">§ 03</span><h2>Information We Collect</h2></div>
  <div class="subsection">
    <h3>3.1 — Information Provided Directly</h3>
    <p class="legal">The Company collects the following categories of information that you or your organisation provide directly:</p>
    <ul class="legal-list">
      <li>Identification and contact data: full name, business email address, telephone number, and job title;</li>
      <li>Organisational data: company name, company size, industry sector, and website URL;</li>
      <li>Contractual and commercial data: information contained in Service Agreements, purchase orders, and invoices;</li>
      <li>Payment and billing data: transmitted to and processed by authorised third-party payment processors; the Company does not store raw payment card information;</li>
      <li>Communications data: the content of emails, messages, and correspondence submitted to or exchanged with the Company.</li>
    </ul>
  </div>
  <div class="subsection">
    <h3>3.2 — Information Collected Automatically</h3>
    <p class="legal">When you access the Company's website, certain technical data is collected automatically:</p>
    <ul class="legal-list">
      <li>Internet Protocol (IP) address and approximate geolocation derived therefrom;</li>
      <li>Browser type, version, and operating system;</li>
      <li>URLs of pages visited, referring URL, and timestamps of access;</li>
      <li>Session duration and interaction data;</li>
      <li>Cookie identifiers and similar tracking technologies (see Section 9).</li>
    </ul>
  </div>
  <div class="subsection">
    <h3>3.3 — Information from Third Parties</h3>
    <p class="legal">The Company may receive limited Personal Data from third-party sources such as LinkedIn, Apollo.io, or other lead intelligence platforms in the course of delivering outreach services to Clients. Such data is processed solely for the purposes authorised by the Client and in accordance with applicable law.</p>
  </div>
</section>

<section class="doc-section" id="s4">
  <div class="section-header"><span class="section-num">§ 04</span><h2>Purposes of Processing</h2></div>
  <p class="legal">The Company processes Personal Data for the following purposes:</p>
  <ol class="legal-list">
    <li>To operate, maintain, and improve the Company's website and digital infrastructure;</li>
    <li>To respond to enquiries, schedule consultations, and facilitate the onboarding of prospective Clients;</li>
    <li>To execute and administer Service Agreements, including delivery of contracted outreach and SDR services;</li>
    <li>To issue invoices, process payments, and maintain financial and accounting records in compliance with applicable law;</li>
    <li>To communicate service-related updates, operational notices, and material changes to agreements;</li>
    <li>To conduct analytics and generate insights to improve service quality and website performance;</li>
    <li>To comply with legal obligations, regulatory requirements, and judicial or governmental orders;</li>
    <li>To enforce the Company's contractual rights and protect against fraud, misuse, or unlawful activity.</li>
  </ol>
  <div class="notice-box">
    <p><strong>No Sale of Data.</strong> The Company does not sell, rent, trade, or otherwise commercially exploit the Personal Data of website visitors or Clients to third parties for advertising, marketing, or profiling purposes.</p>
  </div>
</section>

<section class="doc-section" id="s5">
  <div class="section-header"><span class="section-num">§ 05</span><h2>Legal Basis for Processing</h2></div>
  <p class="legal">The Company processes Personal Data on the following legal bases, as applicable:</p>
  <ul class="legal-list">
    <li><strong>Contractual necessity:</strong> Processing required to perform a Service Agreement to which the Data Subject or their employer is a party;</li>
    <li><strong>Legitimate interests:</strong> Processing necessary for the Company's legitimate business interests, including business development, service improvement, and fraud prevention, provided such interests are not overridden by the rights of the Data Subject;</li>
    <li><strong>Legal obligation:</strong> Processing necessary to comply with applicable statutory, regulatory, or judicial requirements;</li>
    <li><strong>Consent:</strong> Where required by applicable law, the Company will seek explicit consent prior to processing, which may be withdrawn at any time without affecting the lawfulness of prior processing.</li>
  </ul>
</section>

<section class="doc-section" id="s6">
  <div class="section-header"><span class="section-num">§ 06</span><h2>Disclosure of Information</h2></div>
  <p class="legal">The Company does not disclose Personal Data to third parties except in the following circumstances:</p>
  <ul class="legal-list">
    <li><strong>Authorised service providers:</strong> Vendors engaged by the Company to facilitate service delivery, including CRM platforms, email infrastructure providers, payment processors, and cloud hosting services, subject to data processing agreements ensuring equivalent levels of protection;</li>
    <li><strong>Legal and regulatory authorities:</strong> Where disclosure is required by applicable law, court order, subpoena, or request from a competent governmental or regulatory authority;</li>
    <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of all or substantially all of the Company's assets, provided the recipient maintains equivalent data protection standards;</li>
    <li><strong>With consent:</strong> Any disclosure beyond the foregoing will be made only with the prior express written consent of the Data Subject.</li>
  </ul>
</section>

<section class="doc-section" id="s7">
  <div class="section-header"><span class="section-num">§ 07</span><h2>International Transfers of Data</h2></div>
  <p class="legal">Given that the Company's Clients are primarily located in the United States, the United Kingdom, and other jurisdictions outside India, Personal Data may be transferred to and processed in countries other than India. The Company undertakes such transfers in accordance with applicable data protection law, including by executing Standard Contractual Clauses or equivalent safeguards with relevant recipients where required.</p>
  <p class="legal">All cross-border data transfers are conducted in compliance with the Reserve Bank of India's guidelines and any applicable provisions of the Information Technology Act, 2000, and the rules framed thereunder.</p>
</section>

<section class="doc-section" id="s8">
  <div class="section-header"><span class="section-num">§ 08</span><h2>Data Retention</h2></div>
  <p class="legal">The Company retains Personal Data for no longer than is necessary for the purposes for which it was collected, subject to the following minimum retention periods:</p>
  <ul class="legal-list">
    <li>Client contractual and financial records: a minimum of seven (7) years from the date of the last transaction, in accordance with the Companies Act, 2013 and the Income Tax Act, 1961;</li>
    <li>Active service engagement data: for the duration of the Service Agreement plus two (2) years;</li>
    <li>Website visitor and analytics data: up to twenty-four (24) months from collection;</li>
    <li>Marketing and enquiry correspondence: up to twelve (12) months from the last interaction, unless converted to a Client relationship.</li>
  </ul>
  <p class="legal">Upon expiry of the applicable retention period, Personal Data is securely deleted or anonymised in a manner that prevents reconstruction.</p>
</section>

<section class="doc-section" id="s9">
  <div class="section-header"><span class="section-num">§ 09</span><h2>Cookies and Tracking Technologies</h2></div>
  <p class="legal">The Company's website uses cookies and similar technologies to enhance user experience and collect analytical data. The following categories of cookies may be deployed:</p>
  <ul class="legal-list">
    <li><strong>Strictly necessary cookies:</strong> Essential to the operation of the website and cannot be disabled without impacting core functionality;</li>
    <li><strong>Performance and analytics cookies:</strong> Collect aggregated, anonymised data on how visitors interact with the website for the purpose of improving content and navigation;</li>
    <li><strong>Functionality cookies:</strong> Enable the website to remember user preferences and settings across sessions.</li>
  </ul>
  <p class="legal">You may configure your browser to refuse all or certain cookies. Disabling certain cookies may affect the functionality of some areas of the website. The Company does not deploy third-party advertising or behavioural targeting cookies.</p>
</section>

<section class="doc-section" id="s10">
  <div class="section-header"><span class="section-num">§ 10</span><h2>Data Security</h2></div>
  <p class="legal">The Company implements and maintains appropriate technical and organisational security measures designed to protect Personal Data against unauthorised access, accidental loss, destruction, alteration, or disclosure. Such measures include, without limitation:</p>
  <ul class="legal-list">
    <li>Transmission Layer Security (TLS/SSL) encryption for all data transmitted via the Company's website;</li>
    <li>Access controls and role-based permissions limiting access to Personal Data to authorised personnel only;</li>
    <li>Regular review of data handling practices and vendor security assessments;</li>
    <li>Employee training on data protection obligations.</li>
  </ul>
  <p class="legal">Notwithstanding the foregoing, no method of electronic transmission or storage is completely secure. The Company cannot guarantee absolute security and shall not be liable for unauthorised access resulting from circumstances beyond its reasonable control.</p>
</section>

<section class="doc-section" id="s11">
  <div class="section-header"><span class="section-num">§ 11</span><h2>Rights of Data Subjects</h2></div>
  <p class="legal">Subject to applicable law and the provisions of the Digital Personal Data Protection Act, 2023 (as in force), Data Subjects may exercise the following rights with respect to their Personal Data:</p>
  <ol class="legal-list">
    <li><strong>Right of access:</strong> To obtain confirmation of whether the Company processes your Personal Data and to receive a copy thereof;</li>
    <li><strong>Right to rectification:</strong> To request correction of inaccurate or incomplete Personal Data;</li>
    <li><strong>Right to erasure:</strong> To request deletion of Personal Data where it is no longer necessary for the purpose for which it was collected, subject to applicable retention obligations;</li>
    <li><strong>Right to restriction:</strong> To request that the Company restrict processing of your Personal Data in specified circumstances;</li>
    <li><strong>Right to data portability:</strong> To receive your Personal Data in a structured, commonly used, machine-readable format, where technically feasible;</li>
    <li><strong>Right to object:</strong> To object to processing based on legitimate interests, including profiling;</li>
    <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, to withdraw such consent at any time without affecting the lawfulness of prior processing.</li>
  </ol>
  <p class="legal">To exercise any of the above rights, please submit a written request to the Company's Grievance Officer (see Section 15). The Company will respond within thirty (30) days of receipt of a valid request, subject to verification of identity.</p>
</section>

<section class="doc-section" id="s13">
  <div class="section-header"><span class="section-num">§ 13</span><h2>Amendments to This Policy</h2></div>
  <p class="legal">The Company reserves the right to amend or update this Policy at any time to reflect changes in applicable law, regulatory guidance, or the Company's data practices. Material amendments will be notified to registered Clients via electronic communication to the email address on record, at least fourteen (14) days prior to the effective date of such amendments.</p>
  <p class="legal">Continued use of the Company's website or Services following the effective date of any revision constitutes acceptance of the revised Policy. The current version of this Policy is always available at <em>www.millioncxo.com/privacy-policy</em>.</p>
</section>

<section class="doc-section" id="s14">
  <div class="section-header"><span class="section-num">§ 14</span><h2>Governing Law</h2></div>
  <p class="legal">This Policy is governed by and construed in accordance with the laws of India, including the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023, as amended from time to time. Any dispute arising from or in connection with this Policy shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.</p>
</section>

<section class="doc-section" id="s15">
  <div class="section-header"><span class="section-num">§ 15</span><h2>Contact and Grievance Redressal</h2></div>
  <p class="legal">In accordance with the Information Technology Act, 2000, and applicable rules, the name and contact details of the Grievance Officer are provided below. Any complaints, queries, or concerns regarding the processing of Personal Data may be directed to:</p>
  <dl class="definition-block">
    <dt>Grievance Officer</dt>
    <dd>Abhinav Kumar, Managing Director<br/>MillionCXO Outreach Private Limited<br/>235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indiranagar, Bengaluru – 560038, Karnataka, India<br/>Email: info@millioncxo.com<br/>Response time: Within 30 days of receipt</dd>
  </dl>
</section>
`

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      effectiveDate="1 March 2025"
      lastRevised="March 2025"
      version="Version 1.0"
      tocItems={tocItems}
      tocFooterLinks={tocFooterLinks}
      contentHtml={contentHtml}
    />
  )
}
