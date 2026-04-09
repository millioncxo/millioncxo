import { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Terms of Service | MillionCXO Outreach Pvt. Ltd.',
  description: 'Terms of Service of MillionCXO Outreach Private Limited — the legally binding agreement governing access to our B2B sales acceleration services.',
}

const tocItems = [
  { href: '#s1', label: '1. Definitions' },
  { href: '#s2', label: '2. Acceptance of Terms' },
  { href: '#s3', label: '3. Description of Services' },
  { href: '#s4', label: '4. Eligibility' },
  { href: '#s5', label: '5. Service Agreements' },
  { href: '#s6', label: '6. Client Obligations' },
  { href: '#s7', label: '7. Payment Terms' },
  { href: '#s8', label: '8. Intellectual Property' },
  { href: '#s9', label: '9. Confidentiality' },
  { href: '#s10', label: '10. Representations and Warranties' },
  { href: '#s11', label: '11. Limitation of Liability' },
  { href: '#s12', label: '12. Indemnification' },
  { href: '#s13', label: '13. Term and Termination' },
  { href: '#s14', label: '14. Dispute Resolution' },
  { href: '#s15', label: '15. Governing Law' },
  { href: '#s16', label: '16. Miscellaneous' },
  { href: '#s17', label: '17. Contact' },
]

const tocFooterLinks = [
  { href: '/privacy-policy', label: '→ Privacy Policy' },
  { href: '/refund-cancellation-policy', label: '→ Refund Policy' },
  { href: '/', label: '← Back to Website' },
]

const contentHtml = `
<div class="preamble">
  <p>These Terms of Service (<strong>"Terms"</strong>) constitute a legally binding agreement between <strong>MillionCXO Outreach Private Limited</strong>, a company incorporated under the Companies Act, 2013, having its registered office at 235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indiranagar, Bengaluru – 560038, Karnataka, India (hereinafter <strong>"Company"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>), and any individual or business entity (<strong>"Client"</strong>, <strong>"you"</strong>, or <strong>"your"</strong>) that accesses the Company's website or engages the Company's services. By using the website at <em>www.millioncxo.com</em> or entering into a Service Agreement, you unconditionally accept these Terms in their entirety.</p>
</div>

<section class="doc-section" id="s1">
  <div class="section-header"><span class="section-num">§ 01</span><h2>Definitions</h2></div>
  <p class="legal">In these Terms, unless the context otherwise requires:</p>
  <dl class="definition-block">
    <dt>"Agreement" or "Service Agreement"</dt>
    <dd>Any written contract, Statement of Work, order form, or proposal accepted by both parties specifying the scope, duration, pricing, and delivery terms of the Services.</dd>
    <dt>"Confidential Information"</dt>
    <dd>All non-public information disclosed by either party to the other, in any form, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.</dd>
    <dt>"ICP" or "Ideal Customer Profile"</dt>
    <dd>The criteria defining the target prospect audience for outreach campaigns, as agreed between the Company and the Client prior to campaign commencement.</dd>
    <dt>"SDR" or "Sales Development Representative"</dt>
    <dd>A trained outbound sales professional deployed by the Company to conduct prospecting, outreach, and appointment-setting activities on behalf of the Client.</dd>
    <dt>"Services"</dt>
    <dd>The B2B sales acceleration services offered by the Company, including without limitation SDR-as-a-Service, LinkedIn Outreach Excellence (LOE), lead generation, cold email campaigns, cold calling, and related ancillary services.</dd>
    <dt>"Deliverables"</dt>
    <dd>The specific outputs produced by the Company under a Service Agreement, which may include meeting bookings, outreach reports, prospect lists, and campaign summaries.</dd>
  </dl>
</section>

<section class="doc-section" id="s2">
  <div class="section-header"><span class="section-num">§ 02</span><h2>Acceptance of Terms</h2></div>
  <p class="legal">By accessing or using the Company's website, submitting a request for services, executing a Service Agreement, or making a payment to the Company, you represent and warrant that:</p>
  <ol class="legal-list">
    <li>You have read, understood, and agree to be bound by these Terms and all documents incorporated herein by reference;</li>
    <li>You have the legal authority and capacity to enter into binding agreements on behalf of yourself and, where applicable, your organisation;</li>
    <li>Your acceptance of these Terms creates a valid and binding obligation enforceable in accordance with its terms.</li>
  </ol>
  <p class="legal">If you do not agree to these Terms, you must immediately cease accessing the Company's website and refrain from engaging the Company's services.</p>
</section>

<section class="doc-section" id="s3">
  <div class="section-header"><span class="section-num">§ 03</span><h2>Description of Services</h2></div>
  <p class="legal">The Company offers the following primary service lines, the specific scope of which shall be set out in the applicable Service Agreement:</p>
  <div class="subsection">
    <h3>3.1 — SDR-as-a-Service</h3>
    <p class="legal">The Company deploys dedicated Sales Development Representatives who conduct outbound prospecting activities on behalf of the Client, including but not limited to cold email campaigns, cold calling, LinkedIn outreach, ICP research, and appointment setting. The SDR-as-a-Service engagement is billed on a monthly subscription basis at rates specified in the applicable Service Agreement.</p>
  </div>
  <div class="subsection">
    <h3>3.2 — LinkedIn Outreach Excellence (LOE)</h3>
    <p class="legal">The Company provides a managed LinkedIn InMail and connection outreach service, delivering up to eight hundred (800) InMails per Sales Navigator licence per month. All outreach is conducted by trained SDRs using human-researched, personalised messaging. The LOE service includes an Account Safety Guarantee as specified in the Company's Refund and Cancellation Policy.</p>
  </div>
  <div class="subsection">
    <h3>3.3 — Ancillary Services</h3>
    <p class="legal">The Company may offer additional services including market research, campaign strategy, CRM integration support, and outreach content development, as specified in individual Service Agreements.</p>
  </div>
  <div class="notice-box">
    <p><strong>Activity vs. Outcome.</strong> The Company commits to agreed activity metrics (volumes of emails sent, calls made, InMails delivered). Outcome metrics such as revenue generated, deals closed, or number of conversions are influenced by factors outside the Company's reasonable control and do not form part of the Company's contractual guarantee unless expressly stated in a Service Agreement.</p>
  </div>
</section>

<section class="doc-section" id="s4">
  <div class="section-header"><span class="section-num">§ 04</span><h2>Eligibility</h2></div>
  <p class="legal">The Company's Services are intended exclusively for business entities and individual professionals engaged in lawful commercial activities. By engaging the Company, you represent and warrant that:</p>
  <ul class="legal-list">
    <li>You are a validly existing legal entity or an individual of at least eighteen (18) years of age with full legal capacity;</li>
    <li>Your use of the Services is for legitimate B2B commercial purposes only;</li>
    <li>You are not located in, or a national or resident of, any country subject to sanctions administered by the Government of India, the United States Office of Foreign Assets Control (OFAC), or any other applicable governmental authority;</li>
    <li>Your engagement of the Services does not violate any applicable law, regulation, or third-party agreement.</li>
  </ul>
</section>

<section class="doc-section" id="s5">
  <div class="section-header"><span class="section-num">§ 05</span><h2>Service Agreements</h2></div>
  <p class="legal">The specific terms governing each engagement, including scope of work, pricing, service levels, and duration, shall be set out in a Service Agreement executed by both parties. In the event of any conflict or inconsistency between these Terms and a Service Agreement, the provisions of the Service Agreement shall prevail to the extent of the inconsistency, unless the Service Agreement expressly provides otherwise.</p>
  <p class="legal">No amendment, modification, or waiver of any provision of a Service Agreement shall be binding unless made in writing and signed by authorised representatives of both parties.</p>
</section>

<section class="doc-section" id="s6">
  <div class="section-header"><span class="section-num">§ 06</span><h2>Client Obligations</h2></div>
  <p class="legal">In addition to any obligations set out in the applicable Service Agreement, the Client agrees to:</p>
  <ol class="legal-list">
    <li>Provide accurate, complete, and up-to-date information as required for campaign setup, ICP definition, and onboarding;</li>
    <li>Grant timely access to LinkedIn accounts, CRM systems, email platforms, or other tools necessary for the delivery of the Services, in accordance with the onboarding timeline;</li>
    <li>Ensure that all prospect data, target lists, or other materials provided to the Company are obtained lawfully, do not infringe any third-party rights, and comply with applicable data protection and anti-spam laws;</li>
    <li>Promptly review and respond to outreach deliverables, meeting requests, and Company communications within agreed timelines;</li>
    <li>Refrain from independently conducting outbound activities on the same LinkedIn accounts or email domains being managed by the Company without prior written notification, as such activity may compromise campaign performance and void service guarantees;</li>
    <li>Pay all invoices by the due dates specified in the applicable Service Agreement and in accordance with Section 7 of these Terms;</li>
    <li>Comply with LinkedIn's Terms of Service, applicable anti-spam legislation (including the CAN-SPAM Act and CASL where relevant), and all other applicable laws in connection with the use of the Services.</li>
  </ol>
</section>

<section class="doc-section" id="s7">
  <div class="section-header"><span class="section-num">§ 07</span><h2>Payment Terms</h2></div>
  <div class="subsection">
    <h3>7.1 — Fees and Invoicing</h3>
    <p class="legal">All fees are denominated in United States Dollars (USD) unless otherwise specified in the Service Agreement. Invoices are issued in advance at the commencement of each billing cycle. The Client shall pay all undisputed invoices within seven (7) calendar days of the invoice date.</p>
  </div>
  <div class="subsection">
    <h3>7.2 — Late Payment</h3>
    <p class="legal">In the event of late payment, the Company reserves the right to charge interest on overdue amounts at the rate of one and one-half percent (1.5%) per month (or the maximum rate permitted by applicable law, if lower), calculated from the due date until the date of actual payment. The Company further reserves the right to suspend the provision of Services where payment remains outstanding for more than fourteen (14) days following the due date, without prejudice to any other rights or remedies available to it.</p>
  </div>
  <div class="subsection">
    <h3>7.3 — Taxes</h3>
    <p class="legal">All fees are exclusive of applicable taxes, including Goods and Services Tax (GST), Value Added Tax (VAT), withholding tax, or any other levies imposed by any governmental authority. The Client is solely responsible for any taxes, duties, or withholding obligations applicable in their jurisdiction. Where applicable, the Company will include GST on invoices issued to Indian clients at the prevailing statutory rate.</p>
  </div>
  <div class="subsection">
    <h3>7.4 — Payment Methods</h3>
    <p class="legal">The Company accepts payment via bank wire transfer, Payoneer, Airwallex, Easebuzz, and other payment platforms as notified to the Client from time to time. International clients may be subject to currency conversion fees charged by their respective financial institutions, which shall be borne solely by the Client.</p>
  </div>
</section>

<section class="doc-section" id="s8">
  <div class="section-header"><span class="section-num">§ 08</span><h2>Intellectual Property</h2></div>
  <div class="subsection">
    <h3>8.1 — Company IP</h3>
    <p class="legal">All proprietary methodologies, playbooks, templates, software tools, training materials, process documentation, and other intellectual property developed by or on behalf of the Company prior to or independently of any specific Client engagement shall remain the sole and exclusive property of the Company. Nothing in these Terms or any Service Agreement shall be construed as transferring or licensing any such intellectual property rights to the Client.</p>
  </div>
  <div class="subsection">
    <h3>8.2 — Deliverables Licence</h3>
    <p class="legal">Subject to full payment of all amounts due, the Company grants the Client a non-exclusive, non-transferable, royalty-free licence to use Deliverables (such as meeting reports, outreach summaries, and campaign analytics) solely for the Client's internal business purposes. This licence does not extend to any underlying tools, methodologies, or frameworks used to produce such Deliverables.</p>
  </div>
  <div class="subsection">
    <h3>8.3 — Client IP</h3>
    <p class="legal">The Client grants the Company a limited, non-exclusive, revocable licence to use the Client's name, logo, brand assets, and product information solely to the extent necessary to perform the Services. The Company shall not use the Client's brand assets for any other purpose, including marketing or promotional materials, without the Client's prior written consent.</p>
  </div>
</section>

<section class="doc-section" id="s9">
  <div class="section-header"><span class="section-num">§ 09</span><h2>Confidentiality</h2></div>
  <p class="legal">Each party (the <strong>"Receiving Party"</strong>) agrees to hold the other party's (the <strong>"Disclosing Party"</strong>) Confidential Information in strict confidence and not to disclose, reproduce, or use such Confidential Information for any purpose other than the performance or receipt of the Services, without the prior written consent of the Disclosing Party.</p>
  <p class="legal">The obligations of confidentiality shall not apply to information that: (i) is or becomes publicly available through no breach of these Terms; (ii) was already known to the Receiving Party at the time of disclosure; (iii) is independently developed by the Receiving Party without reference to the Confidential Information; or (iv) is required to be disclosed by law, court order, or regulatory authority, provided that the Receiving Party gives the Disclosing Party prompt prior written notice to the extent permitted by law.</p>
  <p class="legal">The obligations of confidentiality shall survive the termination or expiry of these Terms and any Service Agreement for a period of two (2) years.</p>
</section>

<section class="doc-section" id="s10">
  <div class="section-header"><span class="section-num">§ 10</span><h2>Representations and Warranties</h2></div>
  <div class="subsection">
    <h3>10.1 — Company Warranties</h3>
    <p class="legal">The Company represents and warrants that: (i) it has the full corporate power and authority to enter into and perform its obligations under these Terms and any Service Agreement; (ii) it will perform the Services with reasonable skill, care, and diligence; and (iii) the Services will be delivered in material compliance with the specifications set out in the applicable Service Agreement.</p>
  </div>
  <div class="subsection">
    <h3>10.2 — Disclaimer of Warranties</h3>
    <p class="legal">Except as expressly set out in Section 10.1, the Company provides the Services on an "as is" and "as available" basis without warranty of any kind, whether express, implied, statutory, or otherwise, including without limitation any implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
  </div>
  <div class="subsection">
    <h3>10.3 — Client Warranties</h3>
    <p class="legal">The Client represents and warrants that: (i) it has the authority to enter into these Terms and any Service Agreement; (ii) all information provided to the Company is accurate and complete; and (iii) its use of the Services complies with all applicable laws and regulations, including data protection, anti-spam, and employment laws.</p>
  </div>
</section>

<section class="doc-section" id="s11">
  <div class="section-header"><span class="section-num">§ 11</span><h2>Limitation of Liability</h2></div>
  <div class="warning-box">
    <p><strong>Important Notice.</strong> Please read this section carefully as it limits the Company's liability. By engaging the Company's services, you expressly agree to these limitations.</p>
  </div>
  <p class="legal">To the maximum extent permitted by applicable law:</p>
  <ol class="legal-list">
    <li>The Company's total aggregate liability to the Client for all claims arising out of or in connection with these Terms or any Service Agreement, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed the total fees paid by the Client to the Company in the three (3) calendar months immediately preceding the event giving rise to the relevant claim;</li>
    <li>The Company shall not be liable to the Client for any indirect, incidental, consequential, special, punitive, or exemplary damages, including without limitation loss of revenue, loss of profits, loss of business, loss of data, loss of goodwill, or loss of anticipated savings, even if the Company has been advised of the possibility of such damages;</li>
    <li>The Company shall not be liable for any failure or delay in performance of its obligations to the extent such failure or delay arises from causes beyond its reasonable control, including acts of God, governmental actions, industrial disputes, or failures of third-party platforms (including LinkedIn).</li>
  </ol>
  <p class="legal">Nothing in these Terms shall exclude or limit the Company's liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable law.</p>
</section>

<section class="doc-section" id="s12">
  <div class="section-header"><span class="section-num">§ 12</span><h2>Indemnification</h2></div>
  <p class="legal">The Client shall indemnify, defend, and hold harmless the Company and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or relating to:</p>
  <ol class="legal-list">
    <li>The Client's breach of any representation, warranty, or obligation under these Terms or any Service Agreement;</li>
    <li>The Client's violation of any applicable law, including data protection, anti-spam, or employment legislation;</li>
    <li>Any claim that prospect data or materials provided by the Client to the Company infringe any third-party intellectual property or privacy rights;</li>
    <li>The Client's misuse of any Deliverable in a manner that violates these Terms or applicable law.</li>
  </ol>
</section>

<section class="doc-section" id="s13">
  <div class="section-header"><span class="section-num">§ 13</span><h2>Term and Termination</h2></div>
  <div class="subsection">
    <h3>13.1 — Term</h3>
    <p class="legal">These Terms shall remain in effect for as long as the Client accesses the Company's website or maintains an active Service Agreement with the Company.</p>
  </div>
  <div class="subsection">
    <h3>13.2 — Termination by Notice</h3>
    <p class="legal">Either party may terminate a Service Agreement in accordance with the notice provisions specified therein. In the absence of a specific notice provision, either party may terminate with thirty (30) days' prior written notice to the other party.</p>
  </div>
  <div class="subsection">
    <h3>13.3 — Termination for Cause</h3>
    <p class="legal">Either party may terminate a Service Agreement with immediate effect by written notice if the other party: (i) commits a material breach of these Terms or the Service Agreement and fails to remedy such breach within fourteen (14) days of written notice; (ii) becomes insolvent, is subject to insolvency proceedings, or makes an assignment for the benefit of creditors; or (iii) engages in fraudulent, illegal, or harmful conduct in connection with the Services.</p>
  </div>
  <div class="subsection">
    <h3>13.4 — Effect of Termination</h3>
    <p class="legal">Upon termination, the Client shall promptly pay all outstanding fees for Services rendered up to the effective date of termination. Provisions of these Terms that by their nature should survive termination, including Sections 8 (Intellectual Property), 9 (Confidentiality), 11 (Limitation of Liability), 12 (Indemnification), 14 (Dispute Resolution), and 15 (Governing Law), shall survive termination.</p>
  </div>
</section>

<section class="doc-section" id="s14">
  <div class="section-header"><span class="section-num">§ 14</span><h2>Dispute Resolution</h2></div>
  <p class="legal">In the event of any dispute, controversy, or claim arising out of or relating to these Terms, any Service Agreement, or the breach, termination, or invalidity thereof, the parties shall first attempt to resolve such dispute through good-faith negotiation. Either party may initiate such negotiations by providing written notice to the other party identifying the nature of the dispute in reasonable detail.</p>
  <p class="legal">If the dispute is not resolved through negotiation within thirty (30) days of the date of such written notice (or such longer period as the parties may agree in writing), either party may refer the dispute to arbitration in accordance with the Arbitration and Conciliation Act, 1996, as amended. The seat and venue of arbitration shall be Bengaluru, Karnataka. The arbitral proceedings shall be conducted in the English language before a sole arbitrator agreed upon by the parties, or failing agreement, appointed in accordance with the relevant provisions of the Act.</p>
  <p class="legal">The arbitral award shall be final and binding upon the parties and may be entered as a judgment in any court of competent jurisdiction.</p>
</section>

<section class="doc-section" id="s15">
  <div class="section-header"><span class="section-num">§ 15</span><h2>Governing Law</h2></div>
  <p class="legal">These Terms and any Service Agreement shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. To the extent that any matter is not subject to arbitration under Section 14, the parties submit to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, for the resolution of such matters.</p>
</section>

<section class="doc-section" id="s16">
  <div class="section-header"><span class="section-num">§ 16</span><h2>Miscellaneous</h2></div>
  <ul class="legal-list">
    <li><strong>Entire Agreement:</strong> These Terms, together with any applicable Service Agreement and documents incorporated by reference, constitute the entire agreement between the parties with respect to the subject matter hereof and supersede all prior and contemporaneous agreements, representations, and understandings.</li>
    <li><strong>Severability:</strong> If any provision of these Terms is held to be invalid, illegal, or unenforceable under applicable law, such provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.</li>
    <li><strong>Waiver:</strong> No failure or delay by either party in exercising any right, power, or remedy under these Terms shall operate as a waiver thereof, nor shall any single or partial exercise of any right preclude any other or further exercise thereof.</li>
    <li><strong>Assignment:</strong> The Client may not assign or transfer any rights or obligations under these Terms or any Service Agreement without the prior written consent of the Company. The Company may assign these Terms or any Service Agreement to an affiliate or in connection with a merger, acquisition, or sale of substantially all of its assets, with notice to the Client.</li>
    <li><strong>Notices:</strong> All notices under these Terms shall be in writing and delivered by email (with read receipt requested) or courier to the addresses specified in the applicable Service Agreement or as updated by written notice.</li>
    <li><strong>Amendments:</strong> The Company reserves the right to amend these Terms at any time. Material amendments will be notified to active Clients at least fourteen (14) days prior to their effective date. Continued use of the Services following such notification constitutes acceptance of the amended Terms.</li>
  </ul>
</section>

<section class="doc-section" id="s17">
  <div class="section-header"><span class="section-num">§ 17</span><h2>Contact</h2></div>
  <p class="legal">For all legal, contractual, or service-related enquiries under these Terms:</p>
  <dl class="definition-block">
    <dt>MillionCXO Outreach Private Limited</dt>
    <dd>235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indiranagar, Bengaluru – 560038, Karnataka, India<br/>Email: info@millioncxo.com<br/>Website: www.millioncxo.com</dd>
  </dl>
  <div class="sig-block">
    <div class="sig-col">
      <h4>Issued By</h4>
      <p>MillionCXO Outreach Private Limited<br/>Bengaluru, Karnataka, India</p>
      <div class="sig-line"></div>
      <p style="font-size:0.8rem;">Authorised Signatory</p>
    </div>
    <div class="sig-col">
      <h4>Document Reference</h4>
      <p>Document: MCXO-TOS-2025-01<br/>Version: 1.0<br/>Effective: 1 March 2025<br/>Review Due: 1 March 2026</p>
    </div>
  </div>
</section>
`

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      effectiveDate="1 March 2025"
      lastRevised="March 2025"
      version="Version 1.0"
      tocItems={tocItems}
      tocFooterLinks={tocFooterLinks}
      contentHtml={contentHtml}
    />
  )
}
