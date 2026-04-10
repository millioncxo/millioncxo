import { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | MillionCXO Outreach Pvt. Ltd.',
  description: 'Refund and Cancellation Policy of MillionCXO Outreach Private Limited — terms governing refunds, cancellations, and billing adjustments for our B2B services.',
}

const tocItems = [
  { href: '#s1', label: '1. Scope and Application' },
  { href: '#s2', label: '2. Nature of Services' },
  { href: '#s3', label: '3. Cancellation Policy' },
  { href: '#s4', label: '4. General Refund Policy' },
  { href: '#s5', label: '5. Refund Eligibility Matrix' },
  { href: '#s6', label: '6. LinkedIn Account Safety Guarantee' },
  { href: '#s7', label: '7. Duplicate and Erroneous Payments' },
  { href: '#s8', label: '8. Refund Process and Timeline' },
  { href: '#s9', label: '9. Billing Disputes' },
  { href: '#s10', label: '10. Service Suspension' },
  { href: '#s11', label: '11. Amendments' },
  { href: '#s12', label: '12. Governing Law' },
  { href: '#s13', label: '13. Contact' },
]

const tocFooterLinks = [
  { href: '/privacy-policy', label: '→ Privacy Policy' },
  { href: '/terms-of-service', label: '→ Terms of Service' },
  { href: '/', label: '← Back to Website' },
]

const contentHtml = `
<div class="preamble">
  <p>This Refund and Cancellation Policy (<strong>"Policy"</strong>) is issued by <strong>MillionCXO Outreach Private Limited</strong>, a company incorporated under the Companies Act, 2013, having its registered office at 235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indiranagar, Bengaluru – 560038, Karnataka, India (<strong>"Company"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>). This Policy governs all requests for refunds, cancellations, and billing adjustments in connection with the Company's B2B sales acceleration services. By subscribing to or paying for any service offered by the Company, the Client unconditionally accepts the terms of this Policy.</p>
</div>

<section class="doc-section" id="s1">
  <div class="section-header"><span class="section-num">§ 01</span><h2>Scope and Application</h2></div>
  <p class="legal">This Policy applies to all services provided by MillionCXO Outreach Private Limited, including without limitation:</p>
  <ul class="legal-list">
    <li>SDR-as-a-Service (monthly and quarterly subscription engagements);</li>
    <li>LinkedIn Outreach Excellence (LOE) — including both the 16X and 20X service tiers;</li>
    <li>Any ancillary or bundled services delivered under a Service Agreement.</li>
  </ul>
  <p class="legal">In the event of any conflict between this Policy and the terms of an individually negotiated Service Agreement, the terms of the Service Agreement shall take precedence to the extent of the inconsistency.</p>
</section>

<section class="doc-section" id="s2">
  <div class="section-header"><span class="section-num">§ 02</span><h2>Nature of Services and Non-Reversibility</h2></div>
  <p class="legal">The Company's services are professional B2B sales services that involve the deployment of human Sales Development Representatives (SDRs), campaign infrastructure setup, ICP research, content creation, and ongoing outreach execution. These activities commence immediately upon confirmation of payment and involve the incurrence of material costs by the Company from the date of engagement.</p>
  <p class="legal">Given the immediate and human-resource-intensive nature of service commencement, the Company's services are substantially non-reversible once delivery has begun. Accordingly, subscription fees paid to the Company are <strong>non-refundable</strong> as a general rule, subject only to the specific exceptions enumerated in Sections 5 and 6 of this Policy.</p>
  <div class="warning-box">
    <p><strong>Important Notice to Clients.</strong> By proceeding with payment, you acknowledge and agree that the Company will begin resource allocation and service delivery immediately upon receipt of payment, and that the non-refundable nature of subscription fees is a material term of the engagement.</p>
  </div>
</section>

<section class="doc-section" id="s3">
  <div class="section-header"><span class="section-num">§ 03</span><h2>Cancellation Policy</h2></div>
  <div class="subsection">
    <h3>3.1 — Monthly Subscription Cancellations</h3>
    <p class="legal">Clients on a monthly subscription basis may cancel their engagement by providing written notice to the Company at <strong>info@millioncxo.com</strong> at least <strong>fifteen (15) calendar days</strong> prior to the commencement of the next billing cycle. Cancellation requests received after this notice window will be processed with effect from the following billing cycle. No refund shall be due in respect of the current billing cycle upon cancellation.</p>
  </div>
  <div class="subsection">
    <h3>3.2 — Quarterly Subscription Cancellations</h3>
    <p class="legal">Clients on a quarterly subscription basis may cancel their engagement by providing written notice of at least <strong>thirty (30) calendar days</strong> prior to the end of the then-current quarter. Early cancellation within a committed quarter does not entitle the Client to a refund for the unused portion of the quarter, unless the Company is found to be in material breach of the applicable Service Agreement as determined in accordance with Section 5.</p>
  </div>
  <div class="subsection">
    <h3>3.3 — Custom and Project-Based Engagements</h3>
    <p class="legal">Cancellation terms for custom, project-based, or specially negotiated engagements shall be as specified in the applicable Service Agreement and shall take precedence over this general Policy.</p>
  </div>
  <div class="subsection">
    <h3>3.4 — Method of Cancellation</h3>
    <p class="legal">All cancellation requests must be submitted in writing by email to <strong>info@millioncxo.com</strong> from the registered email address associated with the Client's account. Cancellations communicated verbally, through third parties, or via informal channels shall not be considered valid. The Company will acknowledge receipt of a valid cancellation request within two (2) business days.</p>
  </div>
</section>

<section class="doc-section" id="s4">
  <div class="section-header"><span class="section-num">§ 04</span><h2>General Refund Policy</h2></div>
  <p class="legal">Except as provided in Sections 5 and 6, all fees paid to the Company are <strong>non-refundable</strong>. The following circumstances shall specifically not give rise to a refund entitlement:</p>
  <ul class="legal-list">
    <li>Client-initiated cancellation within an active billing cycle;</li>
    <li>Change of business direction, strategy, or budget on the part of the Client;</li>
    <li>Dissatisfaction with outreach results where the Company has met agreed activity metrics (volumes of emails sent, calls made, InMails delivered);</li>
    <li>The Client's failure to provide timely access to required systems, platforms, or information, where such failure has materially impaired the Company's ability to deliver the Services;</li>
    <li>Delays caused by factors outside the Company's reasonable control, including platform downtime, LinkedIn policy changes, or third-party tool failures;</li>
    <li>Requests made more than thirty (30) days after the relevant payment date.</li>
  </ul>
</section>

<section class="doc-section" id="s5">
  <div class="section-header"><span class="section-num">§ 05</span><h2>Refund Eligibility Matrix</h2></div>
  <p class="legal">The following matrix sets out the specific circumstances in which a refund may be claimed and the applicable refund entitlement:</p>
  <table class="refund-table">
    <thead>
      <tr>
        <th style="width:40%">Circumstance</th>
        <th style="width:30%">Refund Entitlement</th>
        <th style="width:30%">Eligibility</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>LinkedIn account blocked due to LOE outreach conducted strictly within agreed SOPs (see Section 6)</td>
        <td>Full refund of that month's LOE subscription fee</td>
        <td class="eligible">✓ Eligible</td>
      </tr>
      <tr>
        <td>Verified duplicate payment made in error by the Client</td>
        <td>Full refund of the duplicate amount</td>
        <td class="eligible">✓ Eligible</td>
      </tr>
      <tr>
        <td>Company fails to commence Services within 7 days of payment due to its own default</td>
        <td>Full refund of fees paid for the uncommenced period</td>
        <td class="eligible">✓ Eligible</td>
      </tr>
      <tr>
        <td>Material breach of Service Agreement by the Company, confirmed in writing</td>
        <td>Pro-rata refund for undelivered service period, subject to mutual written agreement</td>
        <td class="eligible">✓ Eligible (case-by-case)</td>
      </tr>
      <tr>
        <td>Client-initiated cancellation mid-billing-cycle</td>
        <td>No refund</td>
        <td class="not-eligible">✗ Not Eligible</td>
      </tr>
      <tr>
        <td>Change of budget, internal restructuring, or strategic pivot by Client</td>
        <td>No refund</td>
        <td class="not-eligible">✗ Not Eligible</td>
      </tr>
      <tr>
        <td>Dissatisfaction with pipeline results where activity SLAs were met</td>
        <td>No refund</td>
        <td class="not-eligible">✗ Not Eligible</td>
      </tr>
      <tr>
        <td>Client failure to provide access or information required for delivery</td>
        <td>No refund</td>
        <td class="not-eligible">✗ Not Eligible</td>
      </tr>
      <tr>
        <td>Force majeure events or third-party platform failures</td>
        <td>No refund; service credits may be considered at Company's discretion</td>
        <td class="not-eligible">✗ Not Eligible</td>
      </tr>
    </tbody>
  </table>
</section>

<section class="doc-section" id="s6">
  <div class="section-header"><span class="section-num">§ 06</span><h2>LinkedIn Account Safety Guarantee</h2></div>
  <p class="legal">The Company provides an <strong>Account Safety Guarantee</strong> to Clients subscribed to the LinkedIn Outreach Excellence (LOE) service. Under this guarantee, if a Client's LinkedIn account is restricted or permanently blocked as a <em>direct and proximate result</em> of outreach activity conducted by the Company under the agreed methodology, the Company will refund the full LOE subscription fee for the affected billing month.</p>
  <p class="legal">This guarantee is subject to all of the following conditions being satisfied:</p>
  <ol class="legal-list">
    <li>The Company was operating the Client's LinkedIn account solely within the access parameters, daily activity limits, and messaging guidelines defined in the applicable Service Agreement or onboarding documentation;</li>
    <li>The Client did not independently conduct any outbound activity, automation, or third-party tool usage on the same LinkedIn account during the relevant period without prior written notification to the Company;</li>
    <li>The Client provides reasonable evidence of the account restriction (e.g., a screenshot of the LinkedIn restriction notice) within seven (7) calendar days of the restriction occurring;</li>
    <li>The restriction was not caused by: (i) the Client's own prior use of prohibited automation tools; (ii) pre-existing warnings or violations on the Client's LinkedIn account; (iii) a change in LinkedIn's terms or enforcement policies beyond the Company's reasonable control; or (iv) the Client's instructions to exceed recommended activity volumes.</li>
  </ol>
  <div class="notice-box">
    <p><strong>Scope of Guarantee.</strong> This guarantee applies only to the LOE subscription fee for the affected billing month. It does not extend to LinkedIn Premium, Sales Navigator licence costs, lost business opportunities, or any consequential losses. The guarantee applies on a per-account, per-month basis.</p>
  </div>
</section>

<section class="doc-section" id="s7">
  <div class="section-header"><span class="section-num">§ 07</span><h2>Duplicate and Erroneous Payments</h2></div>
  <p class="legal">In the event that a Client makes a duplicate payment or an overpayment as a result of a demonstrable technical or administrative error, the Company will refund the excess amount in full. The Client must notify the Company of the duplicate or erroneous payment within fourteen (14) calendar days of the transaction date by submitting a written request to <strong>info@millioncxo.com</strong> with supporting documentation (e.g., bank statement or payment gateway confirmation).</p>
  <p class="legal">The Company shall verify the claim within five (5) business days and, upon confirmation, process the refund within ten (10) business days of verification.</p>
</section>

<section class="doc-section" id="s8">
  <div class="section-header"><span class="section-num">§ 08</span><h2>Refund Process and Timeline</h2></div>
  <div class="subsection">
    <h3>8.1 — How to Submit a Refund Request</h3>
    <p class="legal">To initiate a refund claim, the Client must submit a written request via email to <strong>info@millioncxo.com</strong> using the subject line format: <strong>"Refund Request – [Company Name] – [Invoice Number]"</strong>. The request must include:</p>
    <ul class="legal-list">
      <li>Client company name and registered email address;</li>
      <li>Invoice number and payment reference or transaction ID;</li>
      <li>The specific ground for refund, referencing the applicable provision of this Policy;</li>
      <li>Supporting evidence as required under the relevant provision (e.g., LinkedIn restriction screenshot, duplicate payment confirmation).</li>
    </ul>
  </div>
  <div class="subsection">
    <h3>8.2 — Processing Timeline</h3>
    <p class="legal">Upon receipt of a complete refund request, the Company will:</p>
    <ol class="legal-list">
      <li>Acknowledge receipt of the request within two (2) business days;</li>
      <li>Conduct an internal review and communicate its decision (approval or rejection, with reasons) within seven (7) business days;</li>
      <li>Process approved refunds within ten (10) business days of the approval decision.</li>
    </ol>
  </div>
  <div class="subsection">
    <h3>8.3 — Method of Refund</h3>
    <p class="legal">Approved refunds will be processed to the original payment method used by the Client, where technically feasible. Where refund to the original payment method is not possible due to technical or platform constraints, the Company will offer an alternative refund mechanism (bank wire transfer or credit note) by mutual agreement. Currency conversion costs, if any, shall be borne by the Client.</p>
  </div>
</section>

<section class="doc-section" id="s9">
  <div class="section-header"><span class="section-num">§ 09</span><h2>Billing Disputes</h2></div>
  <p class="legal">If a Client believes that any invoice or charge is incorrect, the Client must notify the Company in writing within thirty (30) calendar days of the relevant invoice or charge date. Disputes raised after this period may, at the Company's sole discretion, be considered untimely and may not be eligible for review or adjustment.</p>
  <p class="legal">Disputed amounts that are not in good faith (i.e., disputes raised without a reasonable basis) shall not excuse the Client from its obligation to pay undisputed amounts by the due date. The Company and the Client shall negotiate in good faith to resolve any billing dispute within fifteen (15) business days of the Company's receipt of written notice of the dispute.</p>
</section>

<section class="doc-section" id="s10">
  <div class="section-header"><span class="section-num">§ 10</span><h2>Service Suspension for Non-Payment</h2></div>
  <p class="legal">Without prejudice to any other rights or remedies available to the Company, if any undisputed invoice remains unpaid more than fourteen (14) calendar days after its due date, the Company reserves the right to suspend the provision of Services with notice to the Client. Suspension of Services does not relieve the Client of its obligation to pay outstanding amounts, and fees continue to accrue during any suspension period unless the Company expressly waives such accrual in writing.</p>
  <p class="legal">The Company shall reinstate Services promptly upon receipt of all outstanding payments and any accrued interest, subject to no other material breach existing at the time of reinstatement.</p>
</section>

<section class="doc-section" id="s11">
  <div class="section-header"><span class="section-num">§ 11</span><h2>Amendments to This Policy</h2></div>
  <p class="legal">The Company reserves the right to amend this Policy at any time to reflect changes in its service offering, applicable law, or business practices. Material amendments will be communicated to active Clients via email at least fourteen (14) days before taking effect. The policy applicable to a given billing cycle is the version in force at the commencement of that cycle.</p>
  <p class="legal">The current version of this Policy is at all times available at <em>www.millioncxo.com/refund-cancellation-policy</em>.</p>
</section>

<section class="doc-section" id="s12">
  <div class="section-header"><span class="section-num">§ 12</span><h2>Governing Law</h2></div>
  <p class="legal">This Policy is governed by and shall be construed in accordance with the laws of India. Any dispute arising from or relating to this Policy shall be resolved in accordance with the dispute resolution mechanism set out in the Company's Terms of Service, including arbitration in Bengaluru, Karnataka. In the absence of an applicable arbitration agreement, the courts of Bengaluru, Karnataka shall have exclusive jurisdiction.</p>
</section>

<section class="doc-section" id="s13">
  <div class="section-header"><span class="section-num">§ 13</span><h2>Contact</h2></div>
  <p class="legal">For refund requests, cancellation notices, or billing enquiries, please contact:</p>
  <dl class="definition-block">
    <dt>MillionCXO Outreach Private Limited</dt>
    <dd>235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage, Indiranagar, Bengaluru – 560038, Karnataka, India<br/>Email: info@millioncxo.com (Subject: Refund Request / Cancellation Notice)<br/>Response time: Within 2 business days of receipt</dd>
  </dl>
</section>
`

export default function RefundCancellationPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      effectiveDate="1 March 2025"
      lastRevised="March 2025"
      version="Version 1.0"
      tocItems={tocItems}
      tocFooterLinks={tocFooterLinks}
      contentHtml={contentHtml}
    />
  )
}
