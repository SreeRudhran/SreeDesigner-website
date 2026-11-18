// 60-Day Technical Upskilling Dashboard Curriculum Data
// Production-grade dataset covering Excel, SQL, Power BI, APIs, and BA/Product Analyst Portfolio
window.CURRICULUM_DATA = {
  meta: {
    title: "My 60-Day Tech Journey",
    subtitle: "From Junior Business Analyst to a stronger, more technical candidate.",
    durationDays: 60,
    totalHours: 180,
    dailyHours: 3,
    passingScorePercent: 75,
    phases: [
      { id: 0, name: "Excel", range: "Days 1–10", days: 10, color: "#43d19e", badge: "01 · Excel", desc: "Data hygiene, formulas, lookups, pivot tables and financial modeling." },
      { id: 1, name: "SQL", range: "Days 11–25", days: 15, color: "#68a7ff", badge: "02 · SQL", desc: "Relational queries, aggregations, multi-table joins, subqueries, CTEs and analytical window functions." },
      { id: 2, name: "Power BI", range: "Days 26–39", days: 14, color: "#f4bd63", badge: "03 · Power BI", desc: "Power Query ETL, star schema dimensional modeling, DAX measures and executive dashboards." },
      { id: 3, name: "APIs & Postman", range: "Days 40–47", days: 8, color: "#a78bfa", badge: "04 · APIs", desc: "Client-server architecture, REST principles, JSON payloads, authentication and test automation." },
      { id: 4, name: "Portfolio & Interviews", range: "Days 48–60", days: 13, color: "#f87171", badge: "05 · Portfolio", desc: "End-to-end FinTech analytics project, BRD documentation, mock interviews and career positioning." }
    ]
  },
  days: [
    // DAY 1
    {
      day: 1, phase: "Excel", phaseId: 0,
      title: "Spreadsheet Fundamentals & FinTech Data Hygiene",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Master Excel grid architecture, cell addressing, and data types (numbers, text, boolean, dates).",
        "Understand how dates are stored as serial numbers to prevent financial calculation errors.",
        "Convert unformatted flat files into formal Excel Tables (Ctrl+T) for dynamic structured referencing.",
        "Clean raw banking/fintech CSV exports without corrupting account numbers and IFSC codes."
      ],
      prerequisites: "Basic familiarity with opening spreadsheets and entering text.",
      expectedOutcome: "A standardized, clean customer onboarding workbook formatted as a structured table with validated data types and no corrupted account numbers.",
      topics: [
        {
          concept: "Data Types & Formatting in Financial Systems",
          what: "Excel handles four core data types: Numeric, Text, Boolean, and Dates (stored as serial numbers since Jan 1, 1900).",
          why: "Fintech account numbers, phone numbers, and IFSC codes often start with leading zeros (e.g., '012345'). If stored as numbers, Excel strips the leading zero, corrupting banking data.",
          how: "Format banking identifiers explicitly as Text (@) or prefix with an apostrophe ('). Format financial amounts as Currency or Accounting with 2 decimals.",
          example: "'004523910293' ensures leading zeros are preserved. Serial number 45620 represents Nov 19, 2024.",
          businessCase: "Ingesting daily KYC onboarding CSVs from payment gateways where bank account numbers must preserve formatting for NACH mandates.",
          pitfalls: "Allowing Excel to auto-format account numbers as Scientific Notation (e.g., 4.52E+11) which causes irreversible truncation."
        },
        {
          concept: "Structured Tables vs Unformatted Ranges",
          what: "Converting a range (Ctrl+T) into an official Excel Table with named columns and automatic formula propagation.",
          why: "Ranges require manual formula dragging and error-prone coordinate references ($A$2:$A$100). Tables expand automatically when new daily transactions arrive.",
          how: "Select data, press Ctrl+T, check 'My table has headers', and assign a table name (e.g., 'tbl_Onboarding') in Table Design.",
          example: "Formula [@SIP_Amount] * 12 uses clear column headers instead of obscure cells like C2 * 12.",
          businessCase: "Setting up a daily transaction log where operations analysts can paste morning exports and all summary formulas update automatically.",
          pitfalls: "Leaving blank header rows or duplicate column names, which breaks structured references."
        }
      ],
      resources: [
        { title: "Excel Data Types & Number Formats", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/available-number-formats-in-excel-0afe8f52-97db-41f1-b9e0-4a7bdd49099c", time: "25 mins", covers: "Official documentation on text vs numeric storage and custom formatting." },
        { title: "Excel Tables Beginner to Advanced Masterclass", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+Tables+Beginner+to+Advanced", time: "30 mins", covers: "Converting ranges to tables, structured referencing, and automatic dynamic expansion." },
        { title: "The Ultimate Excel Beginner Crash Course", platform: "ExcelIsFun", url: "https://www.youtube.com/results?search_query=ExcelIsFun+Excel+Basics+Beginner+Crash+Course", time: "35 mins", covers: "Cell coordinates, data entry best practices, and avoiding formula truncation." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision & Setup: Review spreadsheet terminology and setup learning workbook." },
        { time: "50 mins", activity: "Concept Study: Watch Leila Gharani & ExcelIsFun lessons on Data Types & Tables." },
        { time: "25 mins", activity: "Guided Practice: Recreate number formatting and table conversion exercises." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 hands-on fintech formatting challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Clean and structure a 200-row customer onboarding dataset." },
        { time: "20 mins", activity: "Quiz & Review: Complete the 5 MCQs and 3 scenario questions." }
      ],
      exercises: [
        {
          title: "Preserving Leading Zeros in Bank Account Numbers",
          problem: "A raw CSV export contains 12-digit bank account numbers starting with '0'. Excel stripped the zeros upon opening. Restore them.",
          scenario: "Customer 'Rajesh Kumar' has account '004128938120', but Excel displays '4128938120'.",
          instructions: "1. Create a helper column.\n2. Use the TEXT function to format the number as a 12-digit string.\n3. Verify the leading zeros are restored.",
          expectedOutput: "A text string formatted exactly as '004128938120'.",
          hint: "Use TEXT(cell, \"000000000000\").",
          solution: "=TEXT(B2, \"000000000000\") or format the source column as Text before pasting."
        },
        {
          title: "Converting Flat Range to Dynamic Table with Structured References",
          problem: "You have a range A1:E50 containing transaction data. Convert it to a named table and create a calculated annual column.",
          scenario: "Monthly SIP amounts are in column D. The business needs an 'Annualized_Commitment' column.",
          instructions: "1. Select A1:E50 and press Ctrl+T.\n2. Rename table to 'tbl_SIPs'.\n3. Add column header 'Annualized_Commitment'.\n4. Write a structured formula multiplying Monthly SIP by 12.",
          expectedOutput: "=[@Monthly_SIP] * 12 auto-populating all rows without manual dragging.",
          hint: "Click the Monthly_SIP cell in the same row while writing the formula inside the table.",
          solution: "In the new column, type =[@Monthly_SIP]*12 and hit Enter. Excel auto-calculates the entire table column."
        },
        {
          title: "Date Serial Number Troubleshooting",
          problem: "A stakeholder complains that transaction dates are appearing as numbers like '45618'.",
          scenario: "The date column was accidentally converted to General format after data cleaning.",
          instructions: "1. Select the affected range.\n2. Apply 'Short Date' formatting (DD/MM/YYYY).\n3. Explain to the stakeholder why the number was 45618.",
          expectedOutput: "Displayed date: 17/11/2024. Explanation: Excel counts days starting from Jan 1, 1900.",
          hint: "Use Ctrl+Shift+3 (or Home > Number Format > Short Date).",
          solution: "Press Ctrl+Shift+3 or select Short Date from the Number dropdown. 45618 represents 45,618 days elapsed since 1/1/1900."
        }
      ],
      assignment: {
        title: "FinTech Customer Onboarding & KYC Sanitization Workbook",
        scenario: "You are handed an unformatted export of 100 new investor signups from the mobile app. The data has unformatted phone numbers, scientific notation bank accounts, unformatted dates, and raw ranges.",
        deliverable: "1. Convert range into table 'tbl_NewInvestors'.\n2. Format Phone as 10-digit text.\n3. Format Account Number as 12-digit text with leading zeros.\n4. Format KYC Date as YYYY-MM-DD.\n5. Add calculated column [@KYC_Age_Days] calculating days elapsed since signup using TODAY().",
        completionCriteria: "All 5 formatting tasks completed with zero scientific notation errors and dynamic formula propagation."
      },
      assessment: {
        mcqs: [
          { question: "Why should bank account numbers and IFSC codes never be formatted as 'General' or 'Number' in Excel?", options: ["Excel cannot perform calculations on them.", "Excel strips leading zeros and may convert long account numbers into scientific notation (e.g., 4.5E+11).", "Excel file size increases dramatically.", "Tables do not support the Number format."], correct: 1, explanation: "Account numbers are identifiers, not quantitative values. Formatting as Number strips critical leading zeros and causes scientific notation truncation." },
          { question: "What does the number 45000 represent in an Excel cell formatted as a Date?", options: ["The year 45000 AD.", "45,000 hours since the computer booted.", "45,000 days since January 1, 1900.", "A random transaction hash."], correct: 2, explanation: "Excel date systems store dates as sequential serial numbers, where 1 is January 1, 1900, and 45000 represents March 15, 2023." },
          { question: "What is the primary operational advantage of an Excel Table (Ctrl+T) over a standard cell range?", options: ["Tables look prettier with default blue and white stripes.", "Formulas automatically propagate down newly added rows and use structured column names instead of static coordinates.", "Tables automatically protect the worksheet from editing.", "Tables eliminate the need for Excel formulas."], correct: 1, explanation: "Tables feature calculated column auto-expansion and structured references (e.g. [@Amount]*12), eliminating manual formula dragging errors." },
          { question: "Which keyboard shortcut instantly converts an Excel range into a formal Table?", options: ["Ctrl + Shift + T", "Ctrl + T (or Ctrl + L)", "Alt + T", "Ctrl + Alt + B"], correct: 1, explanation: "Ctrl + T (or Ctrl + L) opens the Create Table dialogue box." },
          { question: "How do you write a formula in a table that references the 'Investment' column in the same row?", options: ["=Investment[Row]", "=[@Investment]", "=THIS.Investment", "=tbl[Investment]"], correct: 1, explanation: "The '@' symbol denotes the current row inside an Excel structured table reference." }
        ],
        scenarios: [
          { question: "A junior analyst uploaded a customer file where IFSC codes like '000SBIN004' lost their leading zeros. How do you prevent this during CSV import?", solution: "Instead of double-clicking the CSV (which lets Excel auto-detect formats), use Data > Get Data > From Text/CSV. In the preview window, change the IFSC column data type from 'Number' to 'Text' before clicking Load." },
          { question: "How would you create a formula in cell E2 that calculates whether a customer's KYC is overdue (more than 30 days old)?", solution: "=IF((TODAY() - C2) > 30, \"Overdue\", \"Compliant\") where C2 contains the KYC submission date." },
          { question: "Why should you avoid using hardcoded values like `* 0.18` inside multiple individual table cells?", solution: "Hardcoded numbers are difficult to audit and update when tax/fee rates change. Always put variable rates (like GST = 18%) in a dedicated parameter cell (e.g., $H$1) or a named range, and reference that cell." }
        ],
        miniAssignment: "Create a 5-column table: Customer_ID, Name, Bank_Account, SIP_Amount, Annual_Commitment. Populate 5 rows with sample data ensuring Bank_Account has leading zeros intact."
      }
    },

    // DAY 2
    {
      day: 2, phase: "Excel", phaseId: 0,
      title: "Mathematical & Summary Functions (SUM, AVERAGE, COUNT, MIN, MAX, ROUND)",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Master quantitative aggregation functions: SUM, AVERAGE, COUNT, COUNTA, MIN, MAX.",
        "Understand the critical difference between COUNT (numeric only) and COUNTA (non-empty cells).",
        "Apply precision rounding functions (ROUND, ROUNDUP, ROUNDDOWN) to financial interest calculations.",
        "Build daily KPI reconciliation summaries for FinTech payment gateway settlements."
      ],
      prerequisites: "Day 1 spreadsheet fundamentals and structured tables.",
      expectedOutcome: "A daily settlement reconciliation sheet calculating total gross merchandise value (GMV), average ticket size, success counts, and fee deductions.",
      topics: [
        {
          concept: "Quantitative Aggregations & Blank Handling",
          what: "SUM calculates totals, AVERAGE computes arithmetic mean, COUNT tallies numeric cells, COUNTA tallies any populated cell.",
          why: "In payment gateways, pending transactions might have blank amounts or text errors ('N/A'). Using COUNT vs COUNTA changes your operational denominator.",
          how: "Use SUM(range) or structured references like SUM(tbl_Txns[Amount]). Avoid manual addition (A1+A2+A3) which returns #VALUE! if a cell contains text.",
          example: "=SUM(tbl_Settlement[Net_Amount]) calculates total net payouts. =AVERAGE(tbl_Settlement[Ticket_Size]) computes mean ticket size.",
          businessCase: "Calculating daily GMV processed across Razorpay and Cashfree settlement batches.",
          pitfalls: "Using AVERAGE on a column containing zero values (0) when you meant to exclude non-transacting users (averaging zeros pulls down metric)."
        },
        {
          concept: "Financial Rounding & Precision Control",
          what: "ROUND rounds to specified decimals. ROUNDUP forces upward ceiling. ROUNDDOWN forces downward floor.",
          why: "Display formatting (decreasing decimal buttons) merely visually rounds the number, but Excel keeps the full floating point precision, creating penny discrepancies in accounting.",
          how: "=ROUND(Amount * Fee_Percent, 2) permanently fixes the calculated value to 2 decimal places.",
          example: "=ROUND(1250.456, 2) results in 1250.46. Display formatting alone keeps 1250.456, causing cumulative balance sheet imbalances.",
          businessCase: "Calculating platform convenience fees (1.75% + GST) per transaction without fractional cent reconciliation errors.",
          pitfalls: "Relying on Home tab decimal visual controls instead of the mathematical ROUND function for financial payouts."
        }
      ],
      resources: [
        { title: "Excel Statistical & Math Functions Guide", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/excel-functions-by-category-5f91f4e9-7b42-46d2-9bd1-63f26a86c0eb", time: "25 mins", covers: "SUM, AVERAGE, COUNT, COUNTA syntax and edge-case handling." },
        { title: "Stop Making Rounding Errors in Excel Financial Models", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+ROUND+ROUNDUP+ROUNDDOWN", time: "25 mins", covers: "Mathematical precision vs cell display formatting." },
        { title: "Master Basic Summary Functions for Business Analysts", platform: "ExcelIsFun", url: "https://www.youtube.com/results?search_query=ExcelIsFun+SUM+AVERAGE+COUNT+COUNTA+MAX+MIN", time: "35 mins", covers: "Real-world dataset calculations and aggregation auditing." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 1 table naming and cell formatting." },
        { time: "50 mins", activity: "Concept Study: Study SUM, AVERAGE, COUNT, COUNTA and ROUND functions." },
        { time: "25 mins", activity: "Guided Practice: Replicate fee calculation and rounding models." },
        { time: "30 mins", activity: "Independent Exercises: Build 3 aggregation tests on transaction data." },
        { time: "40 mins", activity: "Practical Business Assignment: Daily gateway settlement reconciliation model." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 2 assessment questions." }
      ],
      exercises: [
        {
          title: "Audit Total and Mean Ticket Size",
          problem: "Given 250 daily investment transactions, compute total volume, average investment, and min/max single deposits.",
          scenario: "Management wants to know if high-net-worth (HNI) deposits are skewing the platform average.",
          instructions: "1. Compute Total GMV with SUM.\n2. Compute Mean with AVERAGE.\n3. Compute lowest and highest transaction with MIN and MAX.",
          expectedOutput: "Four summary metric cells with clear currency formatting.",
          hint: "Use structured column references: =SUM(tbl_Txns[Amount]).",
          solution: "=SUM(tbl_Txns[Amount]), =AVERAGE(tbl_Txns[Amount]), =MIN(tbl_Txns[Amount]), =MAX(tbl_Txns[Amount])."
        },
        {
          title: "Calculating Gateway MDR Fees with Financial Rounding",
          problem: "Payment gateway charges 1.85% MDR + 18% GST on the MDR amount. Round fee to 2 decimal places.",
          scenario: "Transaction amount is ₹4,500. Calculate net fee and payout amount.",
          instructions: "1. Base MDR = Amount * 0.0185.\n2. Total Fee with GST = Base MDR * 1.18.\n3. Wrap inside ROUND(..., 2).",
          expectedOutput: "₹98.24 fee, ₹4,401.76 net settlement.",
          hint: "=ROUND(B2 * 0.0185 * 1.18, 2).",
          solution: "=ROUND(B2 * 0.0185 * 1.18, 2) for fee; =B2 - ROUND(B2 * 0.0185 * 1.18, 2) for payout."
        },
        {
          title: "COUNT vs COUNTA Data Completeness Audit",
          problem: "Audit a customer KYC submission column containing both numeric phone numbers and text strings ('Pending', 'Missing').",
          scenario: "Operations needs to know how many valid numbers exist vs total records submitted.",
          instructions: "1. Use COUNT on the phone column.\n2. Use COUNTA on the phone column.\n3. Subtract to find unverified records.",
          expectedOutput: "Count of numeric phone numbers and total submissions.",
          hint: "COUNT ignores text; COUNTA counts both text and numbers.",
          solution: "Valid numbers = COUNT(C2:C100); Total submitted = COUNTA(C2:C100); Missing = COUNTA(C2:C100) - COUNT(C2:C100)."
        }
      ],
      assignment: {
        title: "Daily FinTech Gateway Settlement Reconciliation Sheet",
        scenario: "Reconcile daily transaction settlement logs from two payment gateways (Razorpay and Cashfree) totalling ₹1.8 Crore across 1,200 transactions.",
        deliverable: "1. Calculate Total GMV, Average Transaction, Min and Max ticket.\n2. Calculate exact MDR fee deduction per transaction using ROUND(..., 2).\n3. Calculate Net Settlement Amount.\n4. Build an executive KPI summary card block.",
        completionCriteria: "All summary metrics calculated with structured references and verified zero-variance fee reconciliation."
      },
      assessment: {
        mcqs: [
          { question: "What is the key functional difference between COUNT() and COUNTA()?", options: ["COUNT works only on sorted ranges.", "COUNT counts only cells containing numeric values, while COUNTA counts all non-empty cells.", "COUNTA is an outdated function replaced by COUNT.", "COUNT counts text cells, COUNTA counts numbers."], correct: 1, explanation: "COUNT only tallies numbers (including dates). COUNTA tallies any cell that is not empty, including text, errors, and empty strings." },
          { question: "If cell A1 contains ₹1,500.455, what will =ROUND(A1, 2) return?", options: ["1500.45", "1500.46", "1500", "1500.5"], correct: 1, explanation: "The third decimal is 5, so ROUND rounds up to 1500.46." },
          { question: "Why does =SUM(A1:A5) handle text cells safely while =A1+A2+A3+A4+A5 fails if A3 contains text?", options: ["The plus operator (+) expects numbers and returns a #VALUE! error when encountering text, whereas SUM() automatically ignores text cells.", "The plus operator can only add up to 3 cells.", "SUM converts text into 1 automatically.", "There is no difference."], correct: 0, explanation: "Direct arithmetic operators (+, -, *) throw #VALUE! when evaluating non-numeric text, whereas SUM() treats text as zero." },
          { question: "Which function should you use to round an operational fee up to the nearest whole rupee?", options: ["=CEILING.MATH(amount)", "=ROUNDUP(amount, 0)", "Both =ROUNDUP(amount, 0) and =CEILING.MATH(amount) work.", "=ROUND(amount, 0)"], correct: 2, explanation: "Both ROUNDUP(amount, 0) and CEILING.MATH(amount, 1) push the value up to the next integer." },
          { question: "If a column has 10 rows with 8 numbers and 2 blank cells, what will AVERAGE() use as its denominator?", options: ["10", "8", "9", "It throws a #DIV/0! error."], correct: 1, explanation: "AVERAGE ignores empty blank cells completely, using 8 as the denominator." }
        ],
        scenarios: [
          { question: "A stakeholder asks why the sum of the rounded numbers on a printed report differs by ₹0.02 from the grand total. How do you explain and solve it?", solution: "This happens when formulas calculate with unrounded decimals and round only at the grand total, or vice versa. Ensure each line item uses =ROUND(..., 2) before calculating the grand total SUM, ensuring visual consistency." },
          { question: "How do you calculate the average ticket size of active SIPs while strictly ignoring customers with ₹0 commitments without deleting rows?", solution: "Use =AVERAGEIF(tbl_SIPs[Amount], \">0\") which excludes zero values from both numerator and denominator." },
          { question: "Why does COUNTA(\"\") return 1 instead of 0 for a formula cell returning empty quotes?", solution: "An empty string (\"\") is treated as a text string of zero length, which COUNTA considers populated. To count genuinely blank cells, use COUNTBLANK()." }
        ],
        miniAssignment: "Build a 10-row settlement schedule with Transaction_ID, Gross_Amount, MDR_Rate (1.75%), MDR_Fee (rounded to 2 decimals), and Net_Payout. Display grand totals."
      }
    },

    // DAY 3
    {
      day: 3, phase: "Excel", phaseId: 0,
      title: "Logical Expressions & Error Trapping (IF, AND, OR, IFERROR, Absolute References)",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Master relative ($A1), absolute ($A$1), and mixed (A$1) cell referencing strategies.",
        "Implement single, nested, and modern IFS conditional logic to categorize investor segments.",
        "Combine logical conjunctions (AND, OR) to test complex business criteria.",
        "Trap ugly calculation errors (#N/A, #DIV/0!, #VALUE!) gracefully using IFERROR."
      ],
      prerequisites: "Day 2 summary functions and arithmetic operations.",
      expectedOutcome: "A dynamic investor segmentation and transaction failure classification sheet that cleanly handles missing data without exposing error codes.",
      topics: [
        {
          concept: "Absolute ($) Referencing vs Relative Referencing",
          what: "The dollar sign ($) locks column, row, or both when dragging formulas across rows or columns.",
          why: "When applying a single global platform rate (e.g. GST in cell $G$1) across 5,000 transaction rows, relative references shift to empty cells (G2, G3), corrupting calculations.",
          how: "Press F4 while editing cell address to cycle through A1 -> $A$1 -> A$1 -> $A1.",
          example: "=B2 * $G$1 ensures B2 moves to B3, B4 while $G$1 remains permanently pinned.",
          businessCase: "Applying centrally managed interest rates, platform fee tiers, and tax thresholds in financial models.",
          pitfalls: "Forgetting to lock parameter cells, leading to silent calculation errors that show as ₹0."
        },
        {
          concept: "Conditional Logic & Error Trapping",
          what: "IF evaluates condition and returns true/false branches. AND requires all conditions true. OR requires at least one true. IFERROR replaces error output.",
          why: "Raw data contains division by zero (e.g. zero transactions) and missing IDs. Executive sheets must show clean fallbacks ('0', 'Pending') instead of #DIV/0!.",
          how: "=IFERROR(formula, fallback_value). =IF(AND(A2>5000, B2=\"Active\"), \"Priority\", \"Standard\").",
          example: "=IFERROR(DIVIDE(A2, B2), 0) returns 0 instead of #DIV/0!.",
          businessCase: "Automated SIP customer tiering: Gold (AUM > ₹5L AND SIPs >= 3), Silver (AUM > ₹1L), Bronze (others).",
          pitfalls: "Wrapping an entire complex formula in IFERROR(\"\", ...) prematurely, which conceals syntax mistakes and bugs during development."
        }
      ],
      resources: [
        { title: "Master Excel IF, AND, OR, IFS Functions", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+IF+AND+OR+IFS+Function", time: "30 mins", covers: "Nested logical tests, syntax efficiency, and error prevention." },
        { title: "Absolute vs Relative Cell References Explained", platform: "ExcelIsFun", url: "https://www.youtube.com/results?search_query=ExcelIsFun+Absolute+vs+Relative+Cell+Reference+F4", time: "20 mins", covers: "Locking rows and columns for robust model building." },
        { title: "How to Use IFERROR & Clean Up Financial Reports", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/iferror-function-c526fd07-ceeb-4e0a-88e3-2b5587755519", time: "20 mins", covers: "Gracefully trapping #N/A, #VALUE!, and #DIV/0!." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 1 table naming and cell formatting." },
        { time: "50 mins", activity: "Concept Study: Study IF, AND, OR, IFS and IFERROR functions." },
        { time: "25 mins", activity: "Guided Practice: Build conditional customer tagging rules." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 logic and error trapping challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Automated KYC & Risk Profile Assessment Model." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 3 assessment questions." }
      ],
      exercises: [
        {
          title: "Multi-tier Investor Classification",
          problem: "Classify investors into 'High Net Worth' (Investment >= 500,000), 'Emerging' (>= 100,000), or 'Retail' (< 100,000).",
          scenario: "CRM needs customer tags to route high-value users to dedicated wealth managers.",
          instructions: "1. Write an IFS or nested IF formula in column C.\n2. Verify edge cases (exactly 100,000 and 500,000).",
          expectedOutput: "Correct tier string assigned to every row.",
          hint: "=IFS(B2>=500000, \"HNW\", B2>=100000, \"Emerging\", TRUE, \"Retail\").",
          solution: "=IFS(B2>=500000, \"HNW\", B2>=100000, \"Emerging\", TRUE, \"Retail\") or =IF(B2>=500000, \"HNW\", IF(B2>=100000, \"Emerging\", \"Retail\"))."
        },
        {
          title: "Flagging High-Risk Transactions with AND/OR",
          problem: "Flag transaction as 'Review Required' if Amount > ₹200,000 OR (Payment_Status = 'Failed' AND Retry_Count >= 3).",
          scenario: "Compliance rule to detect potential fraud or customer frustration before account freeze.",
          instructions: "1. Use IF combined with OR and AND.\n2. Return 'Review Required' or 'Pass'.",
          expectedOutput: "Conditional alert tags across all transaction logs.",
          hint: "=IF(OR(Amount>200000, AND(Status=\"Failed\", Retries>=3)), \"Review Required\", \"Pass\").",
          solution: "=IF(OR(B2>200000, AND(C2=\"Failed\", D2>=3)), \"Review Required\", \"Pass\")."
        },
        {
          title: "Sanitizing Failure Rate Metrics with IFERROR",
          problem: "Calculate Failure Rate = Failed_Txns / Total_Txns. Prevent #DIV/0! when Total_Txns is 0 for newly onboarded funds.",
          scenario: "New mutual fund schemes launched yesterday have 0 transactions, breaking dashboard summary columns.",
          instructions: "1. Divide Failed / Total.\n2. Wrap in IFERROR returning 0%.",
          expectedOutput: "Clean 0.0% formatting instead of #DIV/0! errors.",
          hint: "=IFERROR(Failed / Total, 0).",
          solution: "=IFERROR(C2 / B2, 0)."
        }
      ],
      assignment: {
        title: "Automated FinTech KYC & Risk Profile Assessment Model",
        scenario: "Build an automated evaluation sheet for 150 applicants. Evaluate: 1) Annual Income, 2) Existing Debts, 3) CIBIL Score, 4) PAN Validation Status.",
        deliverable: "1. Determine Loan/Investment Eligibility: Approved if CIBIL >= 750 AND Income > 3x Debt AND PAN is 'Verified'.\n2. Assign Interest Surcharge using pinned global rates in cells $H$1:$H$3.\n3. Wrap all ratio calculations in IFERROR.\n4. Highlight Approved applicants with conditional formatting.",
        completionCriteria: "Accurate logical evaluation of all 150 records with locked cell references and zero unhandled errors."
      },
      assessment: {
        mcqs: [
          { question: "What happens when you copy the formula =A1*$B$1 from row 1 to row 5?", options: ["It becomes =A5*$B$5", "It becomes =A5*$B$1", "It becomes =A1*$B$1", "It returns #REF!"], correct: 1, explanation: "A1 is a relative reference so it moves down to A5. $B$1 is an absolute reference, so it stays locked to $B$1." },
          { question: "Which logical function returns TRUE only if all tested conditions evaluate to true?", options: ["OR()", "AND()", "NOT()", "XOR()"], correct: 1, explanation: "AND() requires every argument to be TRUE; if even one is FALSE, it returns FALSE." },
          { question: "What will =IFERROR(10/0, \"Calculation Error\") evaluate to?", options: ["#DIV/0!", "0", "\"Calculation Error\"", "#VALUE!"], correct: 2, explanation: "10/0 produces a #DIV/0! error, so IFERROR catches it and returns the fallback string 'Calculation Error'." },
          { question: "How does the IFS() function differ from nested IF() statements?", options: ["IFS() can only evaluate numbers.", "IFS() allows testing multiple conditions sequentially without nesting multiple closing brackets.", "IFS() is slower and deprecated.", "IFS() automatically calculates averages."], correct: 1, explanation: "IFS() evaluates pairs of conditions and results in a single flat formula, avoiding messy nested IF statements." },
          { question: "Pressing which key on Windows cycles between relative and absolute reference styles?", options: ["F2", "F4", "F8", "F9"], correct: 1, explanation: "F4 cycles through relative, absolute, row-locked, and column-locked reference modes." }
        ],
        scenarios: [
          { question: "Why should you never write =IFERROR(formula, \"\") on a model while you are still actively building and debugging formulas?", solution: "Blanking out errors with \"\" masks underlying formula typos, incorrect range references, and data type mismatches. Use IFERROR only once the core logic has been tested and verified." },
          { question: "How can you write a condition that checks if a customer's state is either 'Tamil Nadu' or 'Karnataka' AND their SIP is above ₹5,000?", solution: "=IF(AND(OR(State=\"Tamil Nadu\", State=\"Karnataka\"), SIP_Amount>5000), \"Target Segment\", \"Standard\")." },
          { question: "Explain the difference between $A1 and A$1 when dragged across columns and down rows.", solution: "$A1 locks column A while allowing rows to increment when dragged vertically. A$1 locks row 1 while allowing columns to shift (B$1, C$1) when dragged horizontally." }
        ],
        miniAssignment: "Create a table with User_ID, KYC_Status ('Complete'/'Incomplete'), AUM, and Risk_Tag. Write an IF/AND formula that outputs 'Approved' only if KYC is Complete and AUM >= 25,000."
      }
    },

    // DAY 4
    {
      day: 4, phase: "Excel", phaseId: 0,
      title: "Conditional Aggregations (COUNTIF, COUNTIFS, SUMIF, SUMIFS, AVERAGEIFS)",
      difficulty: "Beginner-Intermediate", duration: 180,
      objectives: [
        "Master single-criterion aggregations (COUNTIF, SUMIF, AVERAGEIF) and multi-criteria aggregations (COUNTIFS, SUMIFS, AVERAGEIFS).",
        "Understand the syntax difference: SUMIFS puts the sum_range FIRST, while SUMIF puts it LAST.",
        "Construct criteria with comparison operators, date thresholds, and wildcards (* and ?).",
        "Build a multi-dimensional FinTech portfolio allocation and payment gateway failure scorecard."
      ],
      prerequisites: "Day 2 summary functions and Day 3 logical expressions.",
      expectedOutcome: "A dynamic summary table aggregating total SIP volume and failure rates across multiple dimensions (Date Range, Gateway, and Fund Category).",
      topics: [
        {
          concept: "Single vs Multi-Criteria Aggregations",
          what: "SUMIFS, COUNTIFS, and AVERAGEIFS calculate aggregations based on one or more boolean criteria across multiple ranges.",
          why: "Executive stakeholders rarely ask 'What was total volume?' They ask 'What was total volume for Equity funds processed via Razorpay in October?'",
          how: "=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2). Note: sum_range is ALWAYS first in SUMIFS.",
          example: "=SUMIFS(tbl_Txns[Amount], tbl_Txns[Gateway], \"Razorpay\", tbl_Txns[Status], \"Success\").",
          businessCase: "Calculating net daily inflows per mutual fund category while strictly filtering out failed or cancelled mandates.",
          pitfalls: "Forgetting to wrap comparison operators in quotation marks when referencing cells (e.g. \">=\"&G1 instead of >=G1)."
        },
        {
          concept: "Dynamic Date Filtering & Wildcards in SUMIFS",
          what: "Filtering records between two dates using \">=\"&StartDate and \"<=\"&EndDate, or matching text patterns using '*' (any text) and '?' (single char).",
          why: "Financial analysis requires reporting by custom month, quarter, or year-to-date (YTD) windows, and matching customer codes like 'SBI*'.",
          how: "=COUNTIFS(tbl_Txns[Date], \">=\"&$B$1, tbl_Txns[Date], \"<=\"&$B$2, tbl_Txns[Bank], \"*HDFC*\").",
          example: "\"*Tech*\" matches 'Axis Tech Fund', 'ICICI Technology Growth', and 'Tata Tech Equity'.",
          businessCase: "Aggregating all SIP transactions routed through PSU banks vs Private banks using wildcard pattern matching.",
          pitfalls: "Mismatching range dimensions: In SUMIFS, all criteria ranges must be the exact same height and width as sum_range, or Excel returns #VALUE!."
        }
      ],
      resources: [
        { title: "Excel SUMIFS & COUNTIFS Masterclass", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+SUMIFS+COUNTIFS+AVERAGEIFS", time: "30 mins", covers: "Multi-criteria syntax, cell referencing with operators, and date bounds." },
        { title: "SUMIFS Function Guide & Practical Business Scenarios", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/sumifs-function-c9e748f5-7ea7-455d-9406-611cebce642b", time: "20 mins", covers: "Official documentation and error troubleshooting." },
        { title: "COUNTIFS and SUMIFS with Dates and Wildcards", platform: "ExcelIsFun", url: "https://www.youtube.com/results?search_query=ExcelIsFun+SUMIFS+Dates+Comparison+Operators+Wildcards", time: "35 mins", covers: "Financial date slicing and wildcards in operational auditing." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 3 IF and IFERROR syntax." },
        { time: "50 mins", activity: "Concept Study: Study SUMIFS, COUNTIFS, and AVERAGEIFS functions." },
        { time: "25 mins", activity: "Guided Practice: Construct multi-criteria gateway aggregation tables." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 conditional aggregation challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build Payment Gateway Performance Matrix." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 4 assessment questions." }
      ],
      exercises: [
        {
          title: "Calculating Mutual Fund Category Inflow",
          problem: "Calculate total successful investment volume for 'Equity' funds processed only through 'NetBanking'.",
          scenario: "Treasury department needs to verify liquidity requirements for specific payment settlement rails.",
          instructions: "1. Use SUMIFS.\n2. Sum Amount column.\n3. Criteria 1: Category = 'Equity'.\n4. Criteria 2: Payment_Mode = 'NetBanking'.\n5. Criteria 3: Status = 'Success'.",
          expectedOutput: "A single total financial sum formatted as INR Currency.",
          hint: "=SUMIFS(Amount, Category, \"Equity\", Mode, \"NetBanking\", Status, \"Success\").",
          solution: "=SUMIFS(tbl_Txns[Amount], tbl_Txns[Category], \"Equity\", tbl_Txns[Payment_Mode], \"NetBanking\", tbl_Txns[Status], \"Success\")."
        },
        {
          title: "Counting Bank-Specific Failed Transactions",
          problem: "Count how many transactions failed due to 'Insufficient Funds' for customers using 'State Bank of India' (Bank IFSC starts with 'SBIN*').",
          scenario: "Operations team wants to notify customers about low account balances before the 5th of the month.",
          instructions: "1. Use COUNTIFS.\n2. Criteria 1: Status = 'Failed'.\n3. Criteria 2: Error_Reason = 'Insufficient Funds'.\n4. Criteria 3: IFSC = 'SBIN*'.",
          expectedOutput: "Count of affected customers.",
          hint: "Use wildcard 'SBIN*' in criteria 3.",
          solution: "=COUNTIFS(tbl_Txns[Status], \"Failed\", tbl_Txns[Error_Reason], \"Insufficient Funds\", tbl_Txns[IFSC], \"SBIN*\")."
        },
        {
          title: "Dynamic Date Window Averaging",
          problem: "Calculate the average transaction value for investments placed between Start_Date ($F$1) and End_Date ($F$2).",
          scenario: "Evaluating if festive season promotional campaigns increased average deposit sizes.",
          instructions: "1. Use AVERAGEIFS on Amount column.\n2. Criteria 1: Date \">=\"&$F$1.\n3. Criteria 2: Date \"<=\"&$F$2.",
          expectedOutput: "Average ticket size across the campaign period.",
          hint: "Remember ampersand: \">=\"&$F$1.",
          solution: "=AVERAGEIFS(tbl_Txns[Amount], tbl_Txns[Date], \">=\"&$F$1, tbl_Txns[Date], \"<=\"&$F$2)."
        }
      ],
      assignment: {
        title: "Multi-Dimensional FinTech Payment Gateway Performance Matrix",
        scenario: "You have a log of 2,000 monthly transactions spanning Razorpay, PayU, and Cashfree. Build a dynamic 3x3 summary matrix.",
        deliverable: "1. Table rows = Payment Gateways; Table columns = Successful Volume, Failed Volume, Success Rate %, Failure Rate %.\n2. Use SUMIFS for volume and COUNTIFS for transaction counts.\n3. Add date slicer inputs in header cells $B$1 (From) and $B$2 (To).\n4. Highlight any gateway with failure rate > 8% using conditional formatting.",
        completionCriteria: "Fully dynamic matrix updating instantly when date cells change, using SUMIFS/COUNTIFS with zero coordinate errors."
      },
      assessment: {
        mcqs: [
          { question: "In what order do arguments appear in the SUMIFS() function?", options: ["=SUMIFS(range1, criteria1, sum_range)", "=SUMIFS(sum_range, criteria_range1, criteria1, ...)", "=SUMIFS(criteria1, range1, sum_range)", "=SUMIFS(sum_range, criteria1, range1)"], correct: 1, explanation: "In SUMIFS, the sum_range is always the first argument, followed by criteria range and criteria pairs. (In SUMIF it was last)." },
          { question: "How do you properly reference a date in cell G1 for a greater-than-or-equal test in COUNTIFS?", options: ["\">=G1\"", "\">=\"&G1", ">=G1", "\">=\"G1"], correct: 1, explanation: "The operator must be enclosed in quotes and concatenated with the cell reference using an ampersand (\">=\"&G1)." },
          { question: "What will happen if the criteria range in SUMIFS has 100 rows, but the sum range has 105 rows?", options: ["Excel sums only the first 100 rows.", "Excel returns a #VALUE! error because ranges must be identical in size.", "Excel fills the missing rows with zeros.", "Excel crashes."], correct: 1, explanation: "In SUMIFS, all ranges must have the exact same shape and dimension, or Excel immediately throws #VALUE!." },
          { question: "Which wildcard in COUNTIFS matches any number of characters?", options: ["?", "*", "#", "%"], correct: 1, explanation: "The asterisk (*) represents any sequence of zero or more characters in Excel formulas." },
          { question: "What does =AVERAGEIFS(C:C, A:A, \"Equity\", B:B, \"Active\") calculate?", options: ["The sum of C where A is Equity.", "The average of column C where column A is 'Equity' and column B is 'Active'.", "The median of active equity investments.", "It produces a syntax error."], correct: 1, explanation: "It computes the arithmetic mean of values in column C matching both criteria." }
        ],
        scenarios: [
          { question: "Why does =SUMIFS(Amount, Status, \"Success\", Amount, \">10000\") work without needing a separate column for the second criterion?", solution: "You can reuse the same column as both a sum_range and a criteria_range to apply numeric threshold filters on the aggregated numbers directly." },
          { question: "How would you write a single formula to count all transactions whose status is either 'Failed' OR 'Cancelled'?", solution: "=SUM(COUNTIFS(tbl_Txns[Status], {\"Failed\", \"Cancelled\"})) or =COUNTIF(tbl_Txns[Status], \"Failed\") + COUNTIF(tbl_Txns[Status], \"Cancelled\")." },
          { question: "A stakeholder notices that SUMIFS returns 0 even though there are matching rows. What are the top 3 potential causes?", solution: "1) Leading or trailing spaces in the text columns ('Success ' vs 'Success'). 2) Numbers stored as text in the sum_range. 3) Criteria quotes mismatch (e.g. \"=G1\" instead of \"=\"&G1)." }
        ],
        miniAssignment: "Create a summary block with Gateway ('Razorpay') and Month ('2024-11'). Write a SUMIFS formula to compute total volume and COUNTIFS to compute successful order count."
      }
    },

    // DAY 5
    {
      day: 5, phase: "Excel", phaseId: 0,
      title: "Modern Lookups & Relational Matching (XLOOKUP, VLOOKUP, INDEX & MATCH)",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master the evolution of lookup functions: VLOOKUP limitations, INDEX/MATCH flexibility, and modern XLOOKUP supremacy.",
        "Implement exact matching, approximate matching, multi-column returns, and fallback values (if_not_found).",
        "Perform two-way matrix lookups (matching both row header and column header dynamically).",
        "Reconcile daily fintech transactions against core customer master tables."
      ],
      prerequisites: "Day 1-4 tables, absolute references, and error handling.",
      expectedOutcome: "A fully reconciled transaction ledger mapping customer demographics, KYC status, and risk tiers from external master tables using robust XLOOKUP formulas.",
      topics: [
        {
          concept: "XLOOKUP vs Legacy VLOOKUP",
          what: "VLOOKUP searches the leftmost column of a table and returns a column index number. XLOOKUP separates lookup array from return array, looking in any direction.",
          why: "If an engineer inserts a column into a VLOOKUP table, hardcoded index numbers (e.g. column 4) silently return the wrong data. XLOOKUP uses dynamic column references that never break.",
          how: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode]).",
          example: "=XLOOKUP(A2, tbl_Users[User_ID], tbl_Users[Email], \"Unregistered User\").",
          businessCase: "Enriching anonymous transaction logs with customer names, emails, and phone numbers from the Master Customer Database.",
          pitfalls: "Using VLOOKUP without specifying FALSE as the 4th argument, causing dangerous approximate matches that return random wrong customer records."
        },
        {
          concept: "Two-Way Matrix Lookups & Multi-Column Pulls",
          what: "Looking up a value at the intersection of a specific row and specific column, or returning multiple adjacent columns with a single dynamic formula.",
          why: "Mutual fund commission fee grids vary by both Asset Class (Equity/Debt) and Investment Horizon (1Yr, 3Yr, 5Yr).",
          how: "XLOOKUP inside XLOOKUP: =XLOOKUP(AssetClass, tbl_Grid[Category], XLOOKUP(Tenure, tbl_Grid[#Headers], tbl_Grid)).",
          example: "Pulling User Name, Email, and Phone simultaneously: =XLOOKUP(A2, tbl_Users[ID], tbl_Users[[Name]:[Phone]]).",
          businessCase: "Calculating dynamically applied distributor trail commissions based on product category and tenure tier.",
          pitfalls: "Hardcoding column indexes instead of using dynamic headers in multi-tier lookup grids."
        }
      ],
      resources: [
        { title: "Why You Should Stop Using VLOOKUP (Use XLOOKUP Instead)", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+XLOOKUP+vs+VLOOKUP", time: "25 mins", covers: "XLOOKUP syntax, horizontal lookups, left lookups, and built-in IFERROR." },
        { title: "INDEX and MATCH: The Classic Dual Lookup System", platform: "ExcelIsFun", url: "https://www.youtube.com/results?search_query=ExcelIsFun+INDEX+MATCH+Excel+Two+Way+Lookup", time: "30 mins", covers: "INDEX MATCH syntax, backwards compatibility, and matrix intersections." },
        { title: "Official XLOOKUP Technical Documentation", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929", time: "20 mins", covers: "Parameters, wildcard search, binary search, and spill behaviors." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 4 conditional aggregations." },
        { time: "50 mins", activity: "Concept Study: Study XLOOKUP, VLOOKUP and INDEX-MATCH functions." },
        { time: "25 mins", activity: "Guided Practice: Replicate left-lookups and two-way matrix lookups." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 lookup challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Reconcile transaction ledger with customer master table." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 5 assessment questions." }
      ],
      exercises: [
        {
          title: "Left-Lookup Customer Demographics",
          problem: "In a table where User_ID is in Column C and Customer_Name is in Column A, pull Customer_Name using User_ID.",
          scenario: "VLOOKUP cannot look to the left without restructuring tables. Use XLOOKUP to extract the name cleanly.",
          instructions: "1. Set lookup_value = User_ID.\n2. Set lookup_array = Column C.\n3. Set return_array = Column A.\n4. Set if_not_found = 'Customer Not Found'.",
          expectedOutput: "Customer name pulled accurately without rearranging source table columns.",
          hint: "=XLOOKUP(E2, tbl_Users[User_ID], tbl_Users[Name], \"Not Found\").",
          solution: "=XLOOKUP(E2, C:C, A:A, \"Customer Not Found\")."
        },
        {
          title: "Two-Way Brokerage Commission Matrix",
          problem: "Find the commission fee rate based on Fund Category (Row) and Investment Amount Tier (Column).",
          scenario: "Distributor payout rates vary: Equity <1L = 1.2%, Equity >1L = 1.5%, Debt <1L = 0.6%, Debt >1L = 0.8%.",
          instructions: "1. Write a nested XLOOKUP (or INDEX/MATCH/MATCH).\n2. Test with Category = 'Equity' and Tier = '>1L'.",
          expectedOutput: "Exact commission percentage (1.50%).",
          hint: "=XLOOKUP(Category, RowRange, XLOOKUP(Tier, HeaderRange, DataRange)).",
          solution: "=XLOOKUP(H2, tbl_Rates[Category], XLOOKUP(H3, tbl_Rates[#Headers], tbl_Rates))."
        },
        {
          title: "Spill Multi-Column Customer Profile",
          problem: "With a single formula in Cell G2, return Customer Name, Phone, and KYC Status simultaneously.",
          scenario: "Speeding up transaction reconciliation by eliminating 3 separate VLOOKUP columns.",
          instructions: "1. Use XLOOKUP.\n2. In return_array, highlight the 3 contiguous columns tbl_Users[[Name]:[KYC_Status]].\n3. Press Enter and observe dynamic array spilling.",
          expectedOutput: "Three populated cells from one single formula.",
          hint: "Select the full multi-column slice in return_array.",
          solution: "=XLOOKUP(F2, tbl_Users[User_ID], tbl_Users[[Name]:[KYC_Status]], \"N/A\")."
        }
      ],
      assignment: {
        title: "FinTech Transaction & KYC Master Reconciliation Model",
        scenario: "You have 500 transaction records with only User_ID. You are provided a separate Master User Table (3,000 rows). Merge datasets and flag anomalies.",
        deliverable: "1. Use XLOOKUP to pull Name, Email, Bank Name, and KYC Status.\n2. Handle unmapped IDs with fallback text 'Unregistered Account'.\n3. Calculate 'High Risk Flag' if Transaction Amount > ₹50,000 AND KYC Status != 'Verified'.\n4. Reconcile total matched volume against raw settlement volume.",
        completionCriteria: "Zero #N/A errors, dynamic multi-column lookups, and 100% matched volume reconciliation."
      },
      assessment: {
        mcqs: [
          { question: "What is the biggest operational flaw of VLOOKUP compared to XLOOKUP?", options: ["VLOOKUP cannot perform additions.", "VLOOKUP requires the lookup column to be the leftmost column and breaks if columns are inserted or deleted.", "VLOOKUP can only return numbers.", "VLOOKUP does not work on Windows."], correct: 1, explanation: "VLOOKUP relies on static column index numbers and cannot search to the left of the lookup column, causing silent data errors when table schemas change." },
          { question: "What parameter in XLOOKUP replaces the need to wrap formulas in IFERROR()?", options: ["match_mode", "if_not_found", "search_mode", "lookup_array"], correct: 1, explanation: "The 4th argument in XLOOKUP is [if_not_found], allowing you to specify a clean fallback value directly." },
          { question: "What will =XLOOKUP(\"User101\", A:A, B:B) do by default if the user is not found and [if_not_found] is omitted?", options: ["Return 0", "Return the closest alphabetical match", "Return #N/A", "Return a blank space"], correct: 2, explanation: "By default, XLOOKUP performs an exact match; if no match is found and no fallback is given, it returns #N/A." },
          { question: "How does INDEX/MATCH compare to VLOOKUP?", options: ["INDEX/MATCH is slower.", "INDEX/MATCH can look in any direction and is immune to column insertion bugs.", "INDEX/MATCH requires alphabetical sorting.", "INDEX/MATCH cannot handle text."], correct: 1, explanation: "INDEX/MATCH decouples the retrieval range from the lookup range, making it immune to column insertions and capable of left lookups." },
          { question: "What feature allows modern Excel formulas like XLOOKUP to populate multiple adjacent cells from a single formula?", options: ["Dynamic Array Spilling", "Pivot Tables", "Flash Fill", "Power Query"], correct: 0, explanation: "Dynamic Array Spilling allows a single formula to return a multi-cell range that spills across rows and columns automatically." }
        ],
        scenarios: [
          { question: "A colleague used VLOOKUP without the 4th argument (=VLOOKUP(A2, D:E, 2)) and the report showed incorrect customer names. Why?", solution: "When the 4th argument (range_lookup) is omitted in VLOOKUP, it defaults to TRUE (Approximate Match). If the table is not sorted alphabetically, it returns erroneous, arbitrary rows. Always set it to FALSE or use XLOOKUP." },
          { question: "How can you use XLOOKUP to find the last transaction made by a customer in a date-sorted log?", solution: "Set the 6th argument [search_mode] to -1 (Search last-to-first): =XLOOKUP(CustomerID, tbl_Txns[User_ID], tbl_Txns[Amount], \"No Txns\", 0, -1)." },
          { question: "What causes a #SPILL! error when using modern XLOOKUP with multi-column returns?", solution: "A #SPILL! error occurs when adjacent cells where the formula needs to spill its results already contain existing data, formatting, or merged cells. Clear the blocking cells to resolve." }
        ],
        miniAssignment: "Create two tables: tbl_Products (ID, Name, Price) and tbl_Orders (Order_ID, Product_ID). Write an XLOOKUP in tbl_Orders to fetch Product Name and Price with an 'Invalid ID' fallback."
      }
    },

    // DAY 6
    {
      day: 6, phase: "Excel", phaseId: 0,
      title: "Data Cleaning, Sanitization & Text Splitting (TRIM, CLEAN, TEXTSPLIT, Flash Fill)",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Sanitize dirty text: strip leading/trailing spaces (TRIM) and non-printable characters (CLEAN).",
        "Extract substrings and parse delimiters using LEFT, RIGHT, MID, FIND, and modern TEXTSPLIT.",
        "Rapidly parse complex strings using Excel Flash Fill (Ctrl+E) and Text to Columns wizard.",
        "Deduplicate transaction registers and standardize inconsistent casing across Indian banking datasets."
      ],
      prerequisites: "Day 1-5 lookups and formulas.",
      expectedOutcome: "A fully cleaned, standardized payment gateway raw log where names are proper-cased, spaces removed, IFSCs parsed, and duplicate transactions eliminated.",
      topics: [
        {
          concept: "Whitespace & Invisibility Sanitization",
          what: "TRIM removes all excess spaces between words and all leading/trailing spaces. CLEAN removes non-printable ASCII characters (char 0 to 31).",
          why: "In web exports, 'HDFC Bank ' contains a trailing space that causes XLOOKUP and SUMIFS to fail matching against 'HDFC Bank'.",
          how: "=TRIM(CLEAN(A2)).",
          example: "\"  Kavitha   Rajan  \" becomes \"Kavitha Rajan\".",
          businessCase: "Sanitizing raw user input from registration forms where users paste names with trailing spaces.",
          pitfalls: "TRIM cannot remove non-breaking HTML spaces (CHAR 160) from web scrapes without substituting them first (=TRIM(SUBSTITUTE(A2, CHAR(160), \" \")))."
        },
        {
          concept: "String Extraction & Delimiter Splitting",
          what: "Extracting components using LEFT, RIGHT, MID, or dynamic TEXTSPLIT(text, col_delimiter).",
          why: "Bank transaction narrations often bundle multiple pieces of data into a single string: 'UPI/4512938192/RAJESH/HDFC/SIP'.",
          how: "=TEXTSPLIT(A2, \"/\") splits the string across 5 adjacent columns automatically.",
          example: "Extracting IFSC bank code from 'SBIN0004128': =LEFT(A2, 4) yields 'SBIN'.",
          businessCase: "Decomposing UPI transaction IDs into Reference Number, Customer VPA, and Settlement Bank Code.",
          pitfalls: "Using fixed-character MID without FIND when variable-length delimiters exist, truncating longer customer names."
        }
      ],
      resources: [
        { title: "Clean Messy Data in Excel in Seconds", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+Clean+Messy+Data+TRIM+CLEAN+Flash+Fill", time: "25 mins", covers: "TRIM, non-breaking spaces, and Flash Fill tips." },
        { title: "TEXTSPLIT, TEXTBEFORE and TEXTAFTER Masterclass", platform: "ExcelIsFun", url: "https://www.youtube.com/results?search_query=ExcelIsFun+TEXTSPLIT+TEXTBEFORE+TEXTAFTER", time: "30 mins", covers: "Modern dynamic text manipulation functions." },
        { title: "Text Functions Guide & Reference", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/text-functions-reference-cccd86ad-547d-4ea9-a065-7bb697c2a56e", time: "20 mins", covers: "Official documentation on string extraction functions." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 5 XLOOKUP exact vs approximate matching." },
        { time: "50 mins", activity: "Concept Study: Study TRIM, CLEAN, LEFT, MID, RIGHT, and TEXTSPLIT." },
        { time: "25 mins", activity: "Guided Practice: Replicate IFSC parsing and string sanitization." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 data cleaning challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Payment Gateway Settlement Sanitization Pipeline." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 6 assessment questions." }
      ],
      exercises: [
        {
          title: "Clean Trailing Spaces and Standardize Name Casing",
          problem: "A column of 100 customer names contains irregular spacing and all-caps or all-lowercase text ('  suresh KUMAR  ').",
          scenario: "Personalized email marketing campaigns require polite proper-cased names ('Suresh Kumar').",
          instructions: "1. Combine PROPER with TRIM.\n2. Apply formula to entire column.\n3. Verify output formatting.",
          expectedOutput: "Clean 'Suresh Kumar' with single spacing.",
          hint: "=PROPER(TRIM(A2)).",
          solution: "=PROPER(TRIM(A2))."
        },
        {
          title: "Parse Bank IFSC Code Components",
          problem: "Given IFSC string 'HDFC0001254', extract the 4-letter Bank Code and the 6-digit Branch Code.",
          scenario: "Validating that the 5th character is always '0' (RBI standard) and routing records to specific bank queues.",
          instructions: "1. Bank Code = LEFT(cell, 4).\n2. RBI Zero Check = MID(cell, 5, 1).\n3. Branch Code = RIGHT(cell, 6).",
          expectedOutput: "Bank Code: 'HDFC', Zero Check: '0', Branch: '001254'.",
          hint: "Use LEFT, MID, and RIGHT functions.",
          solution: "=LEFT(A2, 4), =MID(A2, 5, 1), =RIGHT(A2, 6)."
        },
        {
          title: "Dynamic UPI Narration Splitting",
          problem: "Split UPI narration 'UPI-4392019-AMIT-PAYTM-SIP' into separate columns using TEXTSPLIT.",
          scenario: "Extracting customer name and gateway without writing multiple complex FIND formulas.",
          instructions: "1. In cell B2, write =TEXTSPLIT(A2, \"-\").\n2. Observe dynamic spilling across 5 columns.",
          expectedOutput: "Five clean cells: 'UPI', '4392019', 'AMIT', 'PAYTM', 'SIP'.",
          hint: "Use TEXTSPLIT with hyphen delimiter.",
          solution: "=TEXTSPLIT(A2, \"-\")."
        }
      ],
      assignment: {
        title: "Raw FinTech Payment Gateway Settlement Sanitization Pipeline",
        scenario: "You are given a raw dump of 1,000 transaction narrations containing embedded email IDs, phone numbers with +91 prefixes, messy casing, and duplicate rows.",
        deliverable: "1. Remove duplicate transaction IDs using Data > Remove Duplicates.\n2. Extract clean 10-digit phone numbers by stripping '+91' and non-numeric characters.\n3. Split customer emails into Username and Domain using TEXTBEFORE / TEXTAFTER or TEXTSPLIT.\n4. Standardize all customer names using PROPER(TRIM(CLEAN())).\n5. Document data cleaning rules in a helper sheet.",
        completionCriteria: "100% deduplicated data table with standardized text fields and no lingering whitespace errors."
      },
      assessment: {
        mcqs: [
          { question: "What does the formula =PROPER(TRIM(\"  priya SHARMA \")) return?", options: ["\"Priya Sharma\"", "\"PRIYA SHARMA\"", "\"priya sharma\"", "\" Priya Sharma \""], correct: 0, explanation: "TRIM removes extra leading/trailing whitespace, and PROPER capitalizes the first letter of each word while lowercasing the rest." },
          { question: "Why does standard TRIM() sometimes fail to remove spaces from web-scraped data?", options: ["Websites use encryption.", "Websites often use non-breaking spaces (HTML entity &nbsp;, ASCII code 160) which standard TRIM ignores.", "Excel cannot process web data.", "TRIM only works on numbers."], correct: 1, explanation: "Web tables frequently use non-breaking space characters (CHAR 160). You must use SUBSTITUTE(A1, CHAR(160), \" \") before trimming." },
          { question: "What modern Excel function splits a text string into an array across columns using a delimiter?", options: ["SPLIT()", "TEXTSPLIT()", "COLUMNSPLIT()", "STRING_SPLIT()"], correct: 1, explanation: "TEXTSPLIT() dynamically splits text across columns or rows using specified delimiters." },
          { question: "What is the keyboard shortcut for Excel Flash Fill on Windows?", options: ["Ctrl + F", "Ctrl + E", "Ctrl + D", "Alt + F4"], correct: 1, explanation: "Ctrl + E triggers Flash Fill, instantly detecting patterns and filling adjacent columns." },
          { question: "Which function extracts 4 characters from the middle of a string starting at position 3?", options: ["=MID(text, 3, 4)", "=MIDDLE(text, 3, 4)", "=SUBSTRING(text, 3, 4)", "=LEFT(text, 3, 4)"], correct: 0, explanation: "=MID(text, start_num, num_chars) starts at character 3 and returns 4 characters." }
        ],
        scenarios: [
          { question: "How do you extract the domain name from an email address like 'rajesh.kumar@fintech.co.in' without hardcoding string lengths?", solution: "=TEXTAFTER(A2, \"@\") in modern Excel, or =RIGHT(A2, LEN(A2) - FIND(\"@\", A2)) in legacy versions." },
          { question: "Before running 'Remove Duplicates' on a 10,000-row transaction log, what critical step must you take?", solution: "Verify and select only the unique identifier column (like Transaction_ID). If you select all columns, two distinct transactions of the same amount and date from different users could be mistakenly deleted." },
          { question: "How do you remove numeric currency symbols (like '$' or '₹') and commas from a text string to convert it to a real number?", solution: "=--SUBSTITUTE(SUBSTITUTE(A2, \"₹\", \"\"), \",\", \"\"). The double unary (--) coerces the cleaned text string back into a numeric value." }
        ],
        miniAssignment: "Take a sample narration 'TXN-98421-HDFC-SUCCESS' in A1. Use TEXTSPLIT or MID/FIND to separate into 4 columns: Prefix, ID, Bank, Status."
      }
    },

    // DAY 7 (Weekly Assessment 1)
    {
      day: 7, phase: "Excel", phaseId: 0,
      title: "Multi-Dimensional Pivot Tables, Grouping & Slicers [Weekly Assessment 1]",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Build interactive Pivot Tables to summarize high-volume FinTech datasets without writing manual formulas.",
        "Master the four Pivot quadrants: Filters, Columns, Rows, and Values.",
        "Group transactional dates by Month, Quarter, and Year, and group investment amounts into custom ticket-size bins.",
        "Implement 'Show Values As' calculations (% of Column Total, % Difference From Previous Month).",
        "Connect interactive Slicers and Timelines across multiple Pivot Tables to build a cohesive control panel."
      ],
      prerequisites: "Day 1-6 formulas, data hygiene, and structured tables.",
      expectedOutcome: "A dynamic, multi-pivot reporting board analyzing monthly SIP volume trends, bank failure distributions, and interactive slicer controls.",
      topics: [
        {
          concept: "Pivot Table Architecture & Value Summaries",
          what: "Pivot Tables aggregate thousands of records in memory, displaying multi-dimensional crosstabs instantly.",
          why: "Senior leadership needs answers fast: 'Which payment gateway has the highest failure rate this month?' A Pivot Table answers this in 10 seconds.",
          how: "Insert > PivotTable from structured table. Place Gateway in Rows, Status in Columns, Amount in Values (Sum of Amount) and Transaction_ID in Values (Count).",
          example: "Changing 'Sum of Amount' to 'Show Values As > % of Row Total' to display gateway success percentages side-by-side.",
          businessCase: "Analyzing quarterly SIP retention across distributor branches and investor age demographics.",
          pitfalls: "Building Pivot Tables on unformatted ranges with blank header cells or blank rows, causing 'PivotTable field name is not valid' errors."
        },
        {
          concept: "Date Grouping, Custom Bins & Slicer Connections",
          what: "Right-clicking date rows to group by Months/Quarters, right-clicking numeric amounts to group by custom bins (e.g. ₹1,000 to ₹10,000 in ₹2,500 increments).",
          why: "Raw daily dates overwhelm reports. Grouping aggregates daily noise into executive monthly trends.",
          how: "Right-click date > Group > Select Months & Years. Insert Slicer > Right-click Slicer > Report Connections > Check all Pivot Tables.",
          example: "A single 'Payment Gateway' slicer that simultaneously updates both the Inflow Pivot Table and the Failure Reason Pivot Table.",
          businessCase: "Operational command center allowing team leads to slice by gateway and view synchronized failure and recovery statistics.",
          pitfalls: "Failing to refresh Pivot Tables (Alt+F5) after source data changes, presenting outdated figures to stakeholders."
        }
      ],
      resources: [
        { title: "Comprehensive Pivot Table Masterclass", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+Pivot+Table+Masterclass", time: "35 mins", covers: "Creating pivots, grouping dates, calculated fields, and slicer connections." },
        { title: "How to Group Numbers and Dates in Pivot Tables", platform: "ExcelIsFun", url: "https://www.youtube.com/results?search_query=ExcelIsFun+Pivot+Table+Group+Dates+Numbers+Slicers", time: "25 mins", covers: "Numeric bins, monthly groupings, and timeline filters." },
        { title: "Create a PivotTable to Analyze Worksheet Data", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576", time: "20 mins", covers: "Official guide to PivotTable navigation and settings." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 6 string cleaning and deduplication." },
        { time: "50 mins", activity: "Concept Study: Study Pivot Table architecture, grouping, and Slicer connections." },
        { time: "25 mins", activity: "Guided Practice: Replicate date grouping and 'Show Values As' configurations." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 pivot challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Complete Weekly Assessment 1 Pivot Board." },
        { time: "20 mins", activity: "Quiz & Review: Complete Weekly Assessment 1 cumulative quiz." }
      ],
      exercises: [
        {
          title: "Monthly Inflow Trend by Asset Class",
          problem: "Create a Pivot Table showing total investment volume grouped by Year and Month in rows, and Mutual Fund Category in columns.",
          scenario: "Management wants to see seasonal dip patterns in equity SIPs during festive months.",
          instructions: "1. Insert Pivot from tbl_Txns.\n2. Date in Rows -> Group by Months and Years.\n3. Category in Columns.\n4. Amount in Values.",
          expectedOutput: "A clean matrix with monthly totals and category grand totals.",
          hint: "Right-click any date cell in the pivot and choose Group > Months, Years.",
          solution: "Rows: Date (Years, Months); Columns: Category; Values: Sum of Amount."
        },
        {
          title: "Calculating Success Rate Percentage with 'Show Values As'",
          problem: "Display the percentage distribution of 'Success' vs 'Failed' transactions per Payment Gateway.",
          scenario: "Comparing whether Cashfree has a higher failure proportion than Razorpay.",
          instructions: "1. Rows: Payment_Gateway.\n2. Columns: Status ('Success', 'Failed').\n3. Values: Count of Transaction_ID.\n4. Right-click Value > Show Values As > % of Row Total.",
          expectedOutput: "Each row sums to 100%, showing relative success/failure percentages.",
          hint: "Use % of Row Total to compare proportions across gateways.",
          solution: "Right-click inside values area > Show Values As > % of Row Total."
        },
        {
          title: "Connecting Multi-Pivot Slicers",
          problem: "Create two separate Pivot Tables (1: Volume by Bank, 2: Failure by Reason). Insert one Slicer for 'Payment_Gateway' that controls both.",
          scenario: "Executive interactive reporting where selecting a gateway updates both charts in tandem.",
          instructions: "1. Build Pivot 1 and Pivot 2 on the same sheet.\n2. Insert Slicer on Gateway.\n3. Right-click Slicer > Report Connections > Check both Pivot Tables.",
          expectedOutput: "Clicking 'Razorpay' instantly filters both Pivot Tables.",
          hint: "Report Connections dialog is under Slicer Options.",
          solution: "Select Slicer > Slicer tab > Report Connections > Check PivotTable1 and PivotTable2."
        }
      ],
      assignment: {
        title: "Weekly Assessment 1: Comprehensive FinTech Operations Pivot Board",
        scenario: "You are given 3,000 transaction records spanning 90 days. Synthesize Week 1 concepts into an executive operational report.",
        deliverable: "1. Pivot 1: Monthly Investment Volume & MoM Growth %.\n2. Pivot 2: Failure Reason Breakdown by Payment Gateway (% of Column).\n3. Pivot 3: Ticket Size Distribution binned into ₹0-₹2.5k, ₹2.5k-₹10k, ₹10k-₹50k, >₹50k.\n4. Connect synchronized Slicers for Payment Mode and Date Timeline.\n5. Write a 3-bullet executive summary of key operational findings.",
        completionCriteria: "All 3 Pivot Tables dynamic, formatted in INR currency, zero formula errors, and responsive to slicer clicks."
      },
      assessment: {
        mcqs: [
          { question: "How do you calculate Month-over-Month percentage change inside a Pivot Table without writing a custom formula?", options: ["Write an IF statement outside the pivot.", "Right-click the value field > Show Values As > % Difference From... (Base Field: Date, Base Item: (previous)).", "Use SUMIFS.", "Pivot Tables cannot calculate percentage changes."], correct: 1, explanation: "The '% Difference From' calculation option in Pivot Tables automatically computes growth against the previous chronological period." },
          { question: "Why does a Pivot Table display 'Count of Amount' instead of 'Sum of Amount' when you drag a column to the Values area?", options: ["The column contains one or more text cells, blanks, or numbers stored as text.", "The column has too many rows.", "The worksheet is set to manual calculation.", "Excel prefers counts over sums."], correct: 0, explanation: "If even a single cell in the source column contains text or a blank, Excel defaults to Count instead of Sum." },
          { question: "What happens to a Pivot Table when new rows are appended to an underlying structured Excel Table?", options: ["The Pivot Table updates immediately in real-time.", "The user must click 'Refresh' (Alt + F5) or 'Refresh All' to incorporate the new records.", "The user must delete and rebuild the Pivot Table.", "The Pivot Table throws an error."], correct: 1, explanation: "Pivot Tables cache data in a Pivot Cache; you must refresh the Pivot Table (Alt + F5) to pull newly added table rows." },
          { question: "How can a single Slicer filter two different Pivot Tables on the same worksheet?", options: ["Copy and paste the slicer.", "Use Slicer Settings > Report Connections and select both Pivot Tables.", "Link them using VLOOKUP.", "Group the worksheets."], correct: 1, explanation: "The Report Connections window connects any Slicer to multiple Pivot Tables sharing the same underlying data cache." },
          { question: "Which quadrant of the Pivot Table Fields pane is used to create columns in your cross-tabulated summary?", options: ["Filters", "Rows", "Columns", "Values"], correct: 2, explanation: "Fields placed in the Columns area create horizontal column headers in the pivot grid." }
        ],
        scenarios: [
          { question: "A stakeholder wants to see investments binned into custom brackets (₹1 - ₹1,000, ₹1,001 - ₹5,000, etc.). How do you achieve this in a Pivot Table?", solution: "Place Investment_Amount in Rows. Right-click any amount cell > Group > set Starting at: 1, Ending at: 50000, By: 5000. Excel automatically bins the transactions." },
          { question: "Why should you always create a Pivot Table from a structured Excel Table (Ctrl+T) rather than a raw coordinate range (A1:G1000)?", solution: "If you use A1:G1000, adding new rows at the bottom requires manually updating the Pivot Table data source. An Excel Table expands dynamically, so refreshing the pivot automatically captures all new rows." },
          { question: "What is a 'Calculated Field' in a Pivot Table, and what is its main limitation regarding text fields?", solution: "A Calculated Field applies mathematical formulas to the sum of existing fields (e.g. =Gross_Amount - Fees). Its limitation is that it can only perform mathematical operations on aggregated values, not text logic or individual row-level string manipulation." }
        ],
        miniAssignment: "Create a Pivot Table from sample sales data showing Sales Rep in Rows, Region in Columns, and Sum of Sales in Values. Add a Slicer for Quarter."
      }
    },

    // DAY 8
    {
      day: 8, phase: "Excel", phaseId: 0,
      title: "Financial Charts, Visual Hierarchy & Interactive KPI Dashboards",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Select the right chart type for financial analysis (Combo dual-axis, clustered bar, waterfall, sparklines).",
        "Design executive KPI summary metric cards with dynamic trend arrows and status callouts.",
        "Implement conditional formatting rules (Color scales, data bars, icon sets) without visual clutter.",
        "Apply professional visual design principles: remove chart junk, declutter axes, and establish clear visual hierarchy."
      ],
      prerequisites: "Day 1-7 formulas and pivot tables.",
      expectedOutcome: "A polished, executive-ready single-page financial KPI dashboard that presents investment volume trends, failure distributions, and operational alerts.",
      topics: [
        {
          concept: "Dual-Axis Combo Charts & Financial Visual Hierarchy",
          what: "Combining two distinct metrics (e.g. Total Volume as Columns on primary axis and Success Rate % as a Line on secondary axis).",
          why: "Plotting ₹10 Crore volume and 92% success rate on the same single axis flattens the percentage line against the floor, rendering it invisible.",
          how: "Select data > Insert Combo Chart > Clustered Column - Line on Secondary Axis. Format secondary axis with % and primary with Currency.",
          example: "Columns showing monthly SIP inflows alongside a trend line tracking payment success rate.",
          businessCase: "Demonstrating to executive leadership that transaction failure spikes correlated with specific bank outage periods.",
          pitfalls: "Leaving default Excel styling (heavy grey gridlines, 3D effects, bright contrasting colors) which distracts from data comprehension."
        },
        {
          concept: "Dynamic KPI Metric Cards & Micro-Charts",
          what: "Displaying high-level numbers (Total AUM, Active SIPs, Monthly GMV) in dedicated summary cards with Sparklines (in-cell micro charts).",
          why: "Senior leaders spend 30 seconds reviewing operational reports; KPI cards provide instant executive pulse checks.",
          how: "Use text boxes or merged cells linked directly to summary formula cells (e.g. =$G$1). Insert > Sparklines (Line/Column) in adjacent cells.",
          example: "Card showing '₹4.2 Cr' with a green upward triangle '▲ +14.2% MoM' and a 12-month sparkline trend.",
          businessCase: "Daily morning management dashboard for Chief Operating Officer (COO).",
          pitfalls: "Overcrowding the dashboard with more than 5-6 KPI cards, overwhelming the reader."
        }
      ],
      resources: [
        { title: "How to Build a Clean Professional Dashboard in Excel", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+Dashboard+Design+Clean+Professional", time: "30 mins", covers: "Layout grids, color palettes, combo charts, and card designs." },
        { title: "Dual Axis Combo Charts & Secondary Axis Guide", platform: "ExcelIsFun", url: "https://www.youtube.com/results?search_query=ExcelIsFun+Dual+Axis+Combo+Chart+Excel", time: "20 mins", covers: "Scaling secondary axes and chart formatting best practices." },
        { title: "Present Your Data in a Gantt or Combo Chart", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/present-your-data-in-a-combo-chart-e29f7962-cf32-47ea-a864-4e207e997f62", time: "15 mins", covers: "Official Microsoft guide to combo charts." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 7 multi-pivot slicer connections." },
        { time: "50 mins", activity: "Concept Study: Study Combo charts, KPI card architecture, and visual hierarchy." },
        { time: "25 mins", activity: "Guided Practice: Build dual-axis chart and sparkline micro-tables." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 visual dashboard challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build Executive Investment Operations Dashboard." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 8 assessment questions." }
      ],
      exercises: [
        {
          title: "Build a Volume vs Success Rate Combo Chart",
          problem: "Given monthly data (Months, Total Volume, Success Rate %), construct a dual-axis chart.",
          scenario: "Show monthly investment volume as dark blue bars and success rate as a crisp cyan line on secondary axis.",
          instructions: "1. Select data range.\n2. Insert > Combo Chart.\n3. Check 'Secondary Axis' for Success Rate %.\n4. Format Primary Axis as INR Currency and Secondary as Percentage.",
          expectedOutput: "A professional dual-axis chart with uncluttered labels and clean gridlines.",
          hint: "Change chart type > Combo > Custom Combination.",
          solution: "Primary axis: Volume (Clustered Column); Secondary axis: Success Rate % (Line with markers)."
        },
        {
          title: "Create an Executive KPI Card with Dynamic Growth Indicator",
          problem: "Design a KPI card for 'Total Monthly Inflow' that displays current value and an automated '▲' or '▼' trend indicator.",
          scenario: "If current month > previous month, show green upward arrow; otherwise red downward arrow.",
          instructions: "1. Calculate MoM % = (Current - Prev) / Prev.\n2. In indicator cell, write: =IF(MoM>=0, \"▲ \"&TEXT(MoM, \"+0.0%\"), \"▼ \"&TEXT(MoM, \"-0.0%\")).\n3. Apply conditional formatting (Green if >=0, Red if <0).",
          expectedOutput: "Dynamic text string like '▲ +8.4%' updating automatically.",
          hint: "Use Windows Alt+30 for ▲ and Alt+31 for ▼, or paste the Unicode characters.",
          solution: "=IF(B2>=0, \"▲ +\"&TEXT(B2, \"0.0%\"), \"▼ \"&TEXT(B2, \"0.0%\"))."
        },
        {
          title: "In-Cell Trend Sparklines",
          problem: "Add 6-month in-cell trend sparklines next to a list of 10 mutual fund categories.",
          scenario: "Provide visual trend context without cluttering the sheet with 10 separate standalone charts.",
          instructions: "1. Select target empty cells.\n2. Insert > Sparklines > Line.\n3. Data range = 6-month volume columns.\n4. Enable 'High Point' marker with accent color.",
          expectedOutput: "Clean micro line charts embedded inside single worksheet cells.",
          hint: "Insert tab > Sparklines group > Line.",
          solution: "Select cell > Insert > Sparklines > Line > Data Range: B2:G2 > Check 'High Point'."
        }
      ],
      assignment: {
        title: "Executive FinTech Investment Operations Dashboard",
        scenario: "Consolidate 6 months of platform investment metrics into a single-screen executive reporting canvas.",
        deliverable: "1. Top Row: 4 KPI Cards (Total Volume, Active Investors, Success Rate %, Avg Ticket Size) with MoM trend arrows.\n2. Middle Left: Dual-Axis Combo Chart (Monthly Volume vs Success Rate %).\n3. Middle Right: Horizontal Bar Chart of Failure Reasons.\n4. Bottom: Detailed Performance Table with In-Cell Sparklines.\n5. Remove default Excel gridlines, hide column headers, and apply a cohesive corporate color scheme.",
        completionCriteria: "Single-screen dashboard layout with zero visual clutter, dynamic card linking, and verified currency formatting."
      },
      assessment: {
        mcqs: [
          { question: "Why is a secondary axis required when plotting Transaction Volume (in Crores) and Success Rate (in %) on the same chart?", options: ["Excel does not allow different columns in one chart.", "Because the numerical scale of Crores dwarfs percentages (0 to 1), making the percentage line appear flat against the bottom axis.", "To make the chart 3D.", "Secondary axes are required for all financial charts."], correct: 1, explanation: "Percentages range between 0 and 1, so on a scale of millions or crores, percentage values are indistinguishable from zero without a secondary axis." },
          { question: "What is a Sparkline in Excel?", options: ["A decorative star icon.", "A miniature chart embedded inside a single cell that provides visual trend context.", "A macro that animates numbers.", "An error indicator."], correct: 1, explanation: "Sparklines are lightweight, in-cell micro charts designed to show trends alongside tabular data." },
          { question: "According to data visualization best practices, what should you do with default dark grey Excel chart gridlines?", options: ["Make them thicker.", "Remove them entirely or soften them with very light grey to reduce visual noise.", "Change them to neon green.", "Turn them into dashed lines."], correct: 1, explanation: "Heavy gridlines create visual noise ('chart junk'). Softening or removing them directs attention to the data data itself." },
          { question: "How do you link a floating text box or KPI shape to display the dynamic contents of cell H5?", options: ["Type '=H5' directly inside the shape.", "Select the shape border, click into the formula bar, type '=H5', and press Enter.", "Right-click the shape and choose Link.", "Use VLOOKUP on the shape."], correct: 1, explanation: "Selecting the shape, clicking the formula bar, typing the cell address (=$H$5), and hitting Enter dynamically binds the shape text to the cell." },
          { question: "Which chart type is best suited for ranking failure reasons from most frequent to least frequent?", options: ["Pie chart", "Horizontal Bar chart", "Radar chart", "Scatter plot"], correct: 1, explanation: "Horizontal bar charts are ideal for categorical ranking because long labels are easy to read horizontally and categories are neatly ordered." }
        ],
        scenarios: [
          { question: "Why should you avoid 3D pie and bar charts in business reports?", solution: "3D perspective distorts visual proportions, making slices or bars in the foreground look artificially larger than slices in the background, misleading decision-makers." },
          { question: "How do you ensure a dashboard maintains a clean visual layout when opened on screens with different resolutions?", solution: "Design within a fixed grid boundary (e.g. Columns A to N, Rows 1 to 30), remove worksheet gridlines, freeze panes, and size all charts to snap to grid cells (hold Alt while resizing)." },
          { question: "How can you prevent a chart from distorting or moving when columns or rows on the worksheet are resized?", solution: "Right-click chart border > Format Chart Area > Properties > Select 'Don't move or size with cells'." }
        ],
        miniAssignment: "Create a 3-metric KPI block: Metric Name, Current Month, Prior Month, and a formula calculating '% Change' formatted as '+0.0%;-0.0%'."
      }
    },

    // DAY 9
    {
      day: 9, phase: "Excel", phaseId: 0,
      title: "Capstone Portfolio Project 1: Sales & Revenue Analysis Workbook",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Architect an end-to-end multi-tab financial analysis workbook according to professional financial modeling standards.",
        "Implement a multi-tier sheet structure: '01_Readme', '02_RawData', '03_CleanedData', '04_Calculations', '05_Dashboard'.",
        "Perform complete ETL, data enrichment with XLOOKUP, conditional aggregations, and error trapping across a 5,000-record dataset.",
        "Deliver an executive-ready operational dashboard with dynamic slicers and documented business insights."
      ],
      prerequisites: "Days 1 through 8 masteries (tables, formulas, lookups, pivots, dashboards).",
      expectedOutcome: "A fully functioning, documented Portfolio Project 1 workbook ready to attach to job applications and showcase to hiring managers.",
      topics: [
        {
          concept: "Professional Workbook Architecture & Separation of Concerns",
          what: "Organizing complex financial models into distinct tabs: Inputs/Raw -> Calculations/Pivots -> Outputs/Dashboard.",
          why: "Combining raw data, scratchpad calculations, and final charts on a single sheet creates fragile, unmaintainable workbooks that crash or expose confidential intermediate steps.",
          how: "Tab 1: Readme & Data Dictionary; Tab 2: Raw Data (Locked); Tab 3: Calculations & Working Tables; Tab 4: Executive Presentation Dashboard.",
          example: "Building clean structured references like =SUM(tbl_CleanedTxns[Amount]) rather than cross-sheet coordinate ranges like 'Sheet1'!$A$2:$A$5000.",
          businessCase: "Standard operational model deliverable expected of a Business Analyst in FinTech and banking institutions.",
          pitfalls: "Leaving hardcoded calculation numbers scattered across dashboard presentation cells."
        },
        {
          concept: "Writing Actionable Business Insights & Recommendations",
          what: "Translating quantitative metrics into executive commentary: What happened? Why did it happen? What should the business do next?",
          why: "Hiring managers don't just hire people who can write formulas; they hire analysts who understand what the numbers mean for company profitability.",
          how: "Use the 'Observation -> Impact -> Recommendation' framework for every chart.",
          example: "\"Cashfree weekend failure rate spiked to 14.2% due to bank nodal maintenance, resulting in ₹18.5L in uncollected SIPs. Recommendation: Route weekend transactions to Razorpay fallback rail.\"",
          businessCase: "Preparing the monthly business review (MBR) deck for senior management.",
          pitfalls: "Writing vague commentary like 'Sales went up' without citing exact percentages, root causes, and actionable recommendations."
        }
      ],
      resources: [
        { title: "How to Structure a Professional Excel Financial Model", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+Financial+Model+Structure+Best+Practices", time: "30 mins", covers: "Workbook layout, color coding, documentation, and error auditing." },
        { title: "End-to-End Excel Portfolio Project Walkthrough", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Excel+Full+Project+Beginner+to+Advanced", time: "45 mins", covers: "Data cleaning, analysis, pivot tables, dashboard design, and storytelling." },
        { title: "Excel Modeling Standards & Guidelines", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/guidelines-for-designing-a-workbook-7bf78673-a859-4d64-8395-9b24479f64bf", time: "20 mins", covers: "Design rules for robust enterprise spreadsheets." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review full Phase 1 formula and visualization repertoire." },
        { time: "50 mins", activity: "Project Architecture: Set up the 5 tabs, data dictionary, and clean raw dataset." },
        { time: "25 mins", activity: "Data Enrichment: Write XLOOKUP formulas and structured calculation columns." },
        { time: "30 mins", activity: "Pivot Engine: Construct supporting Pivot Tables with MoM metrics." },
        { time: "40 mins", activity: "Executive Dashboard: Build KPI Cards, Combo Chart, Bar Chart, and Slicers." },
        { time: "20 mins", activity: "Documentation & Review: Write 5 executive insights and complete assessment." }
      ],
      exercises: [
        {
          title: "Workbook Structure & Tab Hygiene Setup",
          problem: "Create and color-code the 5-tab workbook architecture: Readme (Navy), Raw (Grey), Cleaned (Blue), Calcs (Purple), Dashboard (Green).",
          scenario: "Standardizing project repository before importing dataset.",
          instructions: "1. Rename tabs.\n2. Right-click tab > Tab Color.\n3. In Readme tab, create a table with Field Name, Data Type, and Description.",
          expectedOutput: "A beautifully organized workbook ready for audit.",
          hint: "Use consistent naming: 01_Readme, 02_RawData, etc.",
          solution: "Tabs created with clear color hierarchy and documented data dictionary."
        },
        {
          title: "Enriching Transaction Logs with Master Lookups",
          problem: "Using XLOOKUP, join 5,000 raw transaction rows with Customer Master and Fund Master tables.",
          scenario: "Add Customer Tier, State, Fund Name, and Expense Ratio to every transaction.",
          instructions: "1. Add structured columns to tbl_CleanedData.\n2. Write XLOOKUP formulas referencing master tables.\n3. Trap unmapped IDs with 'Unregistered'.",
          expectedOutput: "Complete enriched dataset with zero #N/A errors.",
          hint: "=XLOOKUP([@User_ID], tbl_Users[ID], tbl_Users[Tier], \"Unregistered\").",
          solution: "All 4 lookup columns populated using structured table references."
        },
        {
          title: "Constructing Executive Commentary Cards",
          problem: "Write an automated formula that dynamically generates an executive insight sentence based on top-performing gateway.",
          scenario: "Dashboard header must say: 'Top Gateway this month was [Gateway] generating [Volume] ([Share]% of total).'",
          instructions: "1. Find top gateway with INDEX/MATCH or MAX.\n2. Concatenate into a dynamic executive summary string.",
          expectedOutput: "Dynamic string: 'Top Gateway this month was Razorpay generating ₹2.4 Cr (58.2% of total).'",
          hint: "Use ampersands (&) and TEXT() for numbers.",
          solution: "=\"Top Gateway this month was \" & B2 & \" generating \" & TEXT(C2, \"₹#,##0\") & \" (\" & TEXT(D2, \"0.0%\") & \" of total).\""
        }
      ],
      assignment: {
        title: "Portfolio Project 1: Complete Sales & Revenue Analysis Workbook",
        scenario: "Complete the comprehensive Excel Portfolio Project using the supplied 5,000-record fintech dataset.",
        deliverable: "1. Tab 01_Readme: Project background, scope, and data dictionary.\n2. Tab 02_CleanedData: 5,000 cleaned rows with calculated fields.\n3. Tab 03_Calculations: 4 supporting Pivot Tables with MoM growth and gateway performance.\n4. Tab 04_Dashboard: 4 KPI Cards, 2 Combo/Bar charts, 2 interactive Slicers.\n5. Tab 05_ExecutiveSummary: 5 structured business insights with recommendations.",
        completionCriteria: "Fully functioning standalone workbook adhering to professional visual and structural standards."
      },
      assessment: {
        mcqs: [
          { question: "Why should calculation tables and raw data be kept on separate worksheet tabs from the final dashboard?", options: ["Excel crashes if they are on the same tab.", "To prevent accidental formula overwrites, maintain clean visual presentation, and simplify workbook auditing.", "Formulas cannot reference cells on the same worksheet.", "To make the file smaller."], correct: 1, explanation: "Separating data, calculation engine, and presentation layer is the foundational rule of financial modeling, ensuring auditability and safety." },
          { question: "What is the best way to document data definitions for a hiring manager reviewing your Excel portfolio?", options: ["Send an email.", "Include a dedicated '01_Readme' or 'Data_Dictionary' tab at the front of the workbook explaining each column, data type, and business logic.", "Write notes in cell comments.", "Do not document; let them figure it out."], correct: 1, explanation: "A clean Readme tab demonstrates senior business analysis maturity and thorough professional documentation habits." },
          { question: "What should you do before sharing your completed workbook with an executive stakeholder?", options: ["Leave random test cells on the dashboard.", "Set zoom to 100% on all tabs, place cursor in cell A1, remove unnecessary gridlines, and run Spell Check.", "Save as a .csv file.", "Delete the calculations tab."], correct: 1, explanation: "Standardizing zoom levels to 100%, placing cursor in A1, and cleaning temporary cells ensures a polished first impression." },
          { question: "Which formula dynamic text format properly formats ₹12,450.50 inside a concatenated sentence?", options: ["TEXT(amount, \"₹#,##0.00\")", "FORMAT(amount, \"Currency\")", "CURRENCY(amount)", "amount & \"₹\""], correct: 0, explanation: "TEXT(value, \"format_string\") correctly controls numeric formatting inside concatenated text strings." },
          { question: "What is the 'Observation -> Impact -> Recommendation' framework used for in business analysis?", options: ["Writing software code.", "Structuring analytical findings so data observations lead directly to business consequences and actionable solutions.", "Designing database schemas.", "Calculating compound interest."], correct: 1, explanation: "This framework bridges technical data findings and executive business strategy." }
        ],
        scenarios: [
          { question: "A hiring manager asks: 'How did you validate that your Excel model calculations were 100% accurate?' How do you answer?", solution: "I built automated cross-check reconciliation cells (e.g. =SUM(Dashboard_Totals) - SUM(Raw_Data_Totals)). If the variance is non-zero, the cell flags 'ERROR' in bold red, ensuring no unmapped or double-counted transactions." },
          { question: "Why should you avoid hardcoding intermediate summary numbers directly inside dashboard text boxes?", solution: "Hardcoded numbers do not update when data changes or when users interact with slicers. Always link text boxes to dynamic formula cells (=Sheet!$A$1)." },
          { question: "How would you explain the difference between a Junior BA who just 'runs reports' vs a BA who 'drives business value'?", solution: "A report runner just delivers tables of numbers. A value driver identifies the root causes behind trends, quantifies the revenue impact, and delivers actionable recommendations to fix operational bottlenecks." }
        ],
        miniAssignment: "Draft a 3-bullet executive summary for a fictional scenario where UPI transaction failures increased by 4.2% over Diwali weekend."
      }
    },

    // DAY 10 (Phase 1 Exam)
    {
      day: 10, phase: "Excel", phaseId: 0,
      title: "Phase 1 Comprehensive Examination: Advanced Excel for FinTech",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Evaluate comprehensive mastery across all Phase 1 competencies (Days 1–9).",
        "Test high-speed proficiency in data cleaning, logical expressions, multi-criteria aggregations, lookups, and pivot tables.",
        "Solve practical real-world FinTech business scenarios under timed examination conditions.",
        "Achieve the mandatory 75% examination pass mark to unlock Phase 2 (SQL)."
      ],
      prerequisites: "Completion of Days 1 through 9 modules and assignments.",
      expectedOutcome: "Certified Phase 1 completion badge and verified practical readiness to tackle relational database queries in Phase 2.",
      topics: [
        {
          concept: "Phase 1 Core Competency Synthesis",
          what: "Holistic review of spreadsheet hygiene, formula logic, lookup mechanics, pivot aggregation, and visual storytelling.",
          why: "SQL and Power BI both rely on the exact same relational concepts learned in Excel (filtering = WHERE, joins = XLOOKUP, group by = Pivot Tables).",
          how: "Complete the 25-question comprehensive challenge covering formulas, error diagnostics, and business scenarios.",
          example: "Connecting how:SUMIFS() in Excel translates to SELECT SUM(...) WHERE in SQL and CALCULATE(SUM(...)) in Power BI.",
          businessCase: "Demonstrating to interviewers that your technical foundational skills are robust and production-tested.",
          pitfalls: "Second-guessing syntax basics under exam time pressure."
        },
        {
          concept: "Debugging & Formula Auditing Skills",
          what: "Tracing formula precedents, formula dependents, and using 'Evaluate Formula' to isolate multi-nested logic errors.",
          why: "In real business environments, 80% of analyst time is spent auditing and troubleshooting existing models built by other people.",
          how: "Formulas tab > Evaluate Formula (Alt + M + V) to step through calculations step-by-step.",
          example: "Stepping through a nested =XLOOKUP inside an =IF to pinpoint exactly which term returned #N/A.",
          businessCase: "Inheriting a broken financial reconciliation workbook from a predecessor and fixing it in 1 hour.",
          pitfalls: "Blindly re-writing complex formulas from scratch instead of systematically stepping through with Evaluate Formula."
        }
      ],
      resources: [
        { title: "Excel Formula Auditing & Debugging Guide", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/office/display-the-relationships-between-formulas-and-cells-a59bef2b-3701-46bf-8ff1-d3518771d507", time: "20 mins", covers: "Trace Precedents, Trace Dependents, and Evaluate Formula." },
        { title: "Top 10 Excel Interview Questions for Business Analysts", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+Interview+Questions+for+Business+Analyst", time: "30 mins", covers: "Live problem-solving, lookup questions, and scenario explanations." },
        { title: "Phase 1 Review & Transition to SQL", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Excel+to+SQL+Transition+Guide", time: "25 mins", covers: "How Excel tables, formulas, and pivots map directly to relational database concepts." }
      ],
      timetable: [
        { time: "15 mins", activity: "Phase 1 Speed Drill: Rapid formula syntax flashcards." },
        { time: "50 mins", activity: "Comprehensive Practice: Solve 3 multi-tiered timed audit problems." },
        { time: "25 mins", activity: "Formula Debugging: Audit and repair broken legacy reconciliation models." },
        { time: "30 mins", activity: "Portfolio Polish: Review Project 1 workbook against submission checklist." },
        { time: "40 mins", activity: "Phase 1 Certification Exam: Complete the 25-question evaluation." },
        { time: "20 mins", activity: "Results Analysis & SQL Roadmap: Review missed questions and preview Phase 2." }
      ],
      exercises: [
        {
          title: "Timed Challenge 1: Complex Multi-Condition Audit",
          problem: "Write a single formula in Cell F2 that calculates the total volume of successful SIPs for customers in 'Karnataka' or 'Maharashtra' with investment amounts >= ₹5,000.",
          scenario: "Regional sales director needs immediate confirmation of Tier-1 southern state high-value commitments.",
          instructions: "1. Use SUMIFS with an array constant or add two SUMIFS.\n2. Verify against manual pivot table check.",
          expectedOutput: "Exact matched currency total.",
          hint: "=SUM(SUMIFS(Amount, State, {\"Karnataka\",\"Maharashtra\"}, Amount, \">=5000\", Status, \"Success\")).",
          solution: "=SUM(SUMIFS(tbl_Txns[Amount], tbl_Txns[State], {\"Karnataka\",\"Maharashtra\"}, tbl_Txns[Amount], \">=5000\", tbl_Txns[Status], \"Success\"))."
        },
        {
          title: "Timed Challenge 2: Dynamic Two-Way Lookup with Fallback",
          problem: "Retrieve the fee percentage from a 5x4 commission grid matching both Transaction Type (Row) and Gateway Tier (Column), returning 0% if either is not found.",
          scenario: "Dynamic billing engine invoice calculation.",
          instructions: "1. Use nested XLOOKUP.\n2. Handle missing headers gracefully.",
          expectedOutput: "Correct decimal percentage.",
          hint: "Use XLOOKUP inside XLOOKUP with [if_not_found] set to 0.",
          solution: "=XLOOKUP(A2, tbl_Fees[Type], XLOOKUP(B2, tbl_Fees[#Headers], tbl_Fees, 0), 0)."
        },
        {
          title: "Timed Challenge 3: In-Memory Growth Calculation",
          problem: "Given current month revenue in C2 and prior month in B2, write a formula that outputs 'GROWTH (+12.4%)' or 'CONTRACTION (-4.2%)'.",
          scenario: "Executive summary alert generation.",
          instructions: "1. Compute % change.\n2. Evaluate if >= 0.\n3. Concatenate formatted string.",
          expectedOutput: "Automated status string.",
          hint: "=IF(C2>=B2, \"GROWTH (+\"&TEXT((C2-B2)/B2,\"0.0%\")&\")\", \"CONTRACTION (\"&TEXT((C2-B2)/B2,\"0.0%\")&\")\").",
          solution: "=IF(C2>=B2, \"GROWTH (+\" & TEXT((C2-B2)/B2, \"0.0%\") & \")\", \"CONTRACTION (\" & TEXT((C2-B2)/B2, \"0.0%\") & \")\")."
        }
      ],
      assignment: {
        title: "Phase 1 Certification Examination: End-to-End Practical Challenge",
        scenario: "Complete the 20-minute timed capstone exam combining formulas, error trapping, data cleaning, and pivot calculations across 1,000 banking records.",
        deliverable: "1. Complete all 5 assessment MCQs (passing mark >= 75%).\n2. Solve the 3 complex formula audit scenario challenges.\n3. Validate workbook error cross-checks.",
        completionCriteria: "Attain >= 75% on the certification assessment and successfully log completion in your dashboard."
      },
      assessment: {
        mcqs: [
          { question: "Which formula accurately calculates total successful transactions for 'Equity' funds processed by 'Razorpay'?", options: ["=SUMIFS(tbl[Amount], tbl[Category], \"Equity\", tbl[Gateway], \"Razorpay\", tbl[Status], \"Success\")", "=SUMIF(tbl[Amount], \"Equity\", tbl[Gateway], \"Razorpay\")", "=COUNTIFS(tbl[Category]=\"Equity\", tbl[Gateway]=\"Razorpay\")", "=SUM(tbl[Amount], tbl[Category]=\"Equity\")"], correct: 0, explanation: "SUMIFS requires the sum range first, followed by pairs of criteria ranges and criteria." },
          { question: "If cell A1 contains '  KAVITHA ', what does =LEN(TRIM(A1)) return?", options: ["7", "9", "8", "6"], correct: 0, explanation: "'KAVITHA' has 7 letters. TRIM strips the leading and trailing spaces, leaving 7 characters." },
          { question: "What is the primary technical advantage of XLOOKUP over VLOOKUP?", options: ["It can search from right-to-left and defaults to an exact match without breaking when columns are inserted.", "It works without opening Excel.", "It can only return text.", "It requires data to be sorted alphabetically."], correct: 0, explanation: "XLOOKUP decouples lookup and return arrays, searches in any direction, defaults to exact match, and is immune to column shifts." },
          { question: "How do you group dates into Months and Quarters in an Excel Pivot Table?", options: ["Manually add helper columns with IF statements.", "Right-click any date cell in the Pivot Table, select 'Group...', and choose 'Months' and 'Quarters'.", "Use conditional formatting.", "Pivot Tables cannot group dates."], correct: 1, explanation: "The built-in Group dialog in Pivot Tables automatically groups date serial numbers into months, quarters, and years." },
          { question: "What keyboard shortcut opens the 'Evaluate Formula' tool to step through calculations?", options: ["Alt + M + V", "Ctrl + Shift + Enter", "F9", "Alt + F11"], correct: 0, explanation: "Alt + M + V opens the Evaluate Formula dialog in Excel." }
        ],
        scenarios: [
          { question: "Explain how Excel stores dates and times under the hood and why this allows date arithmetic like =Date2 - Date1.", solution: "Excel stores dates as integer serial numbers counting days since Jan 1, 1900 (Day 1). Times are stored as decimals of a 24-hour day (e.g. 0.5 = 12:00 PM). Subtracting two dates simply subtracts the underlying integers, giving the exact elapsed days." },
          { question: "Why does =XLOOKUP(\"User101\", tbl_Users[ID], tbl_Users[Name]) return #N/A if ID in tbl_Users is stored as text while lookup value is numeric 101?", solution: "Excel treats numeric 101 and text string '101' as completely different data types. Exact match requires both value and data type to match. Fix by converting the lookup value to text using =TEXT(101, \"@\") or source to number." },
          { question: "How do you explain the concept of 'Filter Context' in an Excel Pivot Table to a non-technical manager?", solution: "Filter context is the specific set of conditions applied to any given cell in the pivot table based on its row header, its column header, and any active slicers. The number in that cell represents only the data rows that meet all those criteria simultaneously." }
        ],
        miniAssignment: "Review all Phase 1 concepts, verify your Project 1 workbook has zero errors, and prepare your learning workspace for Phase 2: SQL."
      }
    },

    // DAY 11
    {
      day: 11, phase: "SQL", phaseId: 1,
      title: "Relational Database Architecture & Schema Design",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Understand relational database management systems (RDBMS) architecture: PostgreSQL, MySQL, SQL Server.",
        "Master relational table structures: tables, rows (records), columns (fields), and strict data typing (INT, VARCHAR, DECIMAL, TIMESTAMP, BOOLEAN).",
        "Grasp Primary Keys (PK) and Foreign Keys (FK) as the structural glue enforcing referential integrity.",
        "Interpret FinTech Entity-Relationship Diagrams (ERD) mapping Users, KYC Records, Accounts, Mandates, and Transactions."
      ],
      prerequisites: "Phase 1 completion and tabular data literacy.",
      expectedOutcome: "The ability to read and navigate enterprise FinTech schemas, identifying foreign key linkages and data constraints across production tables.",
      topics: [
        {
          concept: "Relational Tables & Referential Integrity",
          what: "A relational database organizes data into normalized tables linked together by shared keys (Primary Key in parent table, Foreign Key in child table).",
          why: "In Excel, deleting a customer leaves orphan transaction rows with no owner. A relational database enforces Foreign Key constraints, preventing data corruption.",
          how: "Parent table `users` (PK: `user_id`); Child table `transactions` (FK: `user_id` referencing `users.user_id`).",
          example: "Table `sip_mandates` has PK `mandate_id` and FK `user_id`. You cannot create a mandate for a non-existent user.",
          businessCase: "Maintaining core banking ledger integrity where transaction records must strictly tie to verified customer accounts.",
          pitfalls: "Treating an SQL database like a dumping ground of wide flat tables instead of normalized relational structures."
        },
        {
          concept: "Strict Data Typing & Storage Constraints",
          what: "Unlike Excel where numbers, text, and dates can mix in the same column, SQL enforces strict column-level data types.",
          why: "Storing financial amounts as `FLOAT` introduces floating-point precision rounding bugs. Financial ledgers strictly mandate `DECIMAL(15,2)` or `NUMERIC`.",
          how: "Columns defined as `user_id INT`, `email VARCHAR(255)`, `amount DECIMAL(12,2)`, `created_at TIMESTAMP`.",
          example: "Attempting to insert 'Pending' into an `amount DECIMAL` column triggers an immediate DB error.",
          businessCase: "Preventing corrupted payment amounts or invalid date strings from ever entering production databases.",
          pitfalls: "Using `FLOAT` or `DOUBLE` for monetary balances instead of fixed-point `DECIMAL`."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 1: Introduction to Relational Databases", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/introduction", time: "25 mins", covers: "Interactive in-browser introduction to relational tables and schemas." },
        { title: "SQL Basics for Business Analysts & Data Newbies", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Basics+Beginner+Course+Part+1", time: "35 mins", covers: "Database tables, keys, and installation overview." },
        { title: "PostgreSQL Official Documentation: Data Types", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/datatype.html", time: "20 mins", covers: "Numeric, string, and temporal data type specifications." }
      ],
      timetable: [
        { time: "15 mins", activity: "Phase 2 Orientation: Map Excel mental models to relational database concepts." },
        { time: "50 mins", activity: "Concept Study: Study tables, Primary/Foreign keys, and data types." },
        { time: "25 mins", activity: "Schema Exploration: Inspect the 5-table FinTech schema ERD." },
        { time: "30 mins", activity: "Interactive Practice: Complete SQLBolt Lessons 1 & 2." },
        { time: "40 mins", activity: "Practical Business Assignment: Document data dictionary and foreign key relationships." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 11 assessment questions." }
      ],
      exercises: [
        {
          title: "Identify Primary and Foreign Keys in FinTech Schema",
          problem: "Given tables `users`, `accounts`, and `transactions`, identify all PKs and FKs.",
          scenario: "Understanding relationship flow before writing SQL queries.",
          instructions: "1. `users`: user_id, name, email.\n2. `accounts`: account_id, user_id, bank_name.\n3. `transactions`: txn_id, account_id, amount.\nIdentify keys.",
          expectedOutput: "`users.user_id` (PK); `accounts.account_id` (PK), `accounts.user_id` (FK); `transactions.txn_id` (PK), `transactions.account_id` (FK).",
          hint: "Primary keys uniquely identify the row; Foreign keys point to a primary key in another table.",
          solution: "PKs: user_id, account_id, txn_id. FKs: accounts.user_id -> users.user_id; transactions.account_id -> accounts.account_id."
        },
        {
          title: "Choose the Correct SQL Data Type",
          problem: "Select appropriate data types for: Customer PAN (10 chars), Investment Amount, Active Status (True/False), Registration Timestamp.",
          scenario: "Creating table definition DDL for a new KYC feature.",
          instructions: "1. PAN = VARCHAR(10) or CHAR(10).\n2. Amount = DECIMAL(12,2).\n3. Active = BOOLEAN.\n4. Registration = TIMESTAMP.",
          expectedOutput: "Four validated production data types.",
          hint: "Fixed length strings use CHAR or VARCHAR; financial decimals use DECIMAL.",
          solution: "PAN: VARCHAR(10); Amount: DECIMAL(12,2); Active: BOOLEAN; Registration: TIMESTAMP."
        },
        {
          title: "Referential Integrity Violation Debugging",
          problem: "An insert statement into `transactions` fails with 'foreign key constraint \"fk_user\" violated'. Explain why.",
          scenario: "A backend bug attempted to log a transaction for a user_id that does not exist in the `users` table.",
          instructions: "1. Diagnose root cause.\n2. State how the database protects data consistency.",
          expectedOutput: "Clear technical diagnosis of foreign key constraint enforcement.",
          hint: "The referenced parent key must exist before inserting a child record.",
          solution: "The database rejected the insert because user_id referenced does not exist in the parent `users` table, preventing orphaned records."
        }
      ],
      assignment: {
        title: "FinTech Investment Platform Schema & Data Dictionary Document",
        scenario: "Review the core database schema for an investment platform: `dim_users`, `dim_mutual_funds`, `fact_sip_mandates`, `fact_transactions`.",
        deliverable: "1. Create a markdown table documenting all 4 tables with Column Name, Data Type, Constraints (PK, FK, NOT NULL), and Business Description.\n2. Diagram the cardinalities (e.g. 1 user to Many mandates; 1 mandate to Many transactions).\n3. List 3 business questions this schema can answer.",
        completionCriteria: "Accurate schema documentation mapping primary and foreign keys without logical gaps."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary role of a Primary Key in a relational database table?", options: ["To encrypt the row.", "To uniquely identify each record in the table and ensure no duplicate rows exist.", "To sort the data alphabetically.", "To link to an Excel sheet."], correct: 1, explanation: "A Primary Key uniquely identifies every record in a table and cannot contain NULL or duplicate values." },
          { question: "Why is DECIMAL(12,2) preferred over FLOAT for storing currency amounts?", options: ["FLOAT cannot store positive numbers.", "FLOAT uses binary floating-point representation which causes fractional penny rounding errors in financial transactions.", "DECIMAL is faster to compute.", "FLOAT requires more disk space."], correct: 1, explanation: "Floating-point types approximate numbers in binary, introducing rounding discrepancies (e.g. 0.0000001), while DECIMAL stores exact fixed-point decimals." },
          { question: "What is a Foreign Key?", options: ["A key used by international users.", "A column in one table that references the Primary Key of another table, enforcing referential integrity.", "A password to access the database.", "A column that cannot contain numbers."], correct: 1, explanation: "A Foreign Key establishes a parent-child relationship between two tables, ensuring child rows correspond to valid parent rows." },
          { question: "Which SQL command is used to read data from a database table?", options: ["FETCH", "GET", "SELECT", "PULL"], correct: 2, explanation: "SELECT is the fundamental SQL DQL statement used to query and project data." },
          { question: "What does a 1-to-Many (1:N) relationship mean between Users and Transactions?", options: ["Each transaction belongs to many users.", "Each user can have multiple transactions, but each transaction belongs to exactly one user.", "Users and transactions are identical.", "Only 1 user can transact per day."], correct: 1, explanation: "One user can execute numerous transactions over time, while each individual transaction record references one specific customer." }
        ],
        scenarios: [
          { question: "What would happen if a database administrator deleted a customer from the `users` table while their transactions still existed in `transactions` with an ON DELETE RESTRICT constraint?", solution: "The database would immediately block the deletion and throw an error, preventing orphaned transaction records. To delete, you would either need to handle transactions first or use ON DELETE CASCADE." },
          { question: "How does normalizing a database (splitting customer data from transaction logs) save disk space and improve performance?", solution: "Normalization eliminates data redundancy: customer name, address, and phone are stored only once in `users`, rather than repeated across 10,000 transaction rows. This saves disk I/O, prevents update anomalies, and ensures consistent customer information." },
          { question: "Why do production databases use TIMESTAMP WITH TIME ZONE (TIMESTAMPTZ) for transaction logs?", solution: "Financial transactions occur across different global regions. Storing UTC timestamps with timezone offsets prevents ambiguity during Daylight Saving shifts or cross-state settlement audits." }
        ],
        miniAssignment: "Write a sample CREATE TABLE statement for `dim_investor` with investor_id (PK), full_name, email, kyc_status, and created_at."
      }
    },

    // DAY 12
    {
      day: 12, phase: "SQL", phaseId: 1,
      title: "Fundamental Projections: SELECT, DISTINCT & Aliasing",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Master the SELECT statement: projecting specific columns vs SELECT *.",
        "Eliminate duplicate row values using SELECT DISTINCT.",
        "Assign professional column and table aliases using the AS keyword.",
        "Perform arithmetic transformations and string concatenations directly in SELECT projections."
      ],
      prerequisites: "Day 11 database architecture and relational concepts.",
      expectedOutcome: "The ability to write clean, formatted projection queries extracting unique business lists, renaming technical column names, and computing calculated fields.",
      topics: [
        {
          concept: "Column Projections & The Danger of SELECT *",
          what: "SELECT column1, column2 specifies exactly which attributes to retrieve from disk memory.",
          why: "Using SELECT * in production pulls unnecessary gigabytes of data across the network, degrades query performance, and breaks application code when database schemas change.",
          how: "SELECT user_id, email, created_at FROM users; always specify only the columns required.",
          example: "SELECT fund_name, expense_ratio FROM mutual_funds;",
          businessCase: "Querying a 50-column user table for a marketing email campaign where only `name` and `email` are needed.",
          pitfalls: "Writing SELECT * in production reports or scheduled batch ETL pipelines."
        },
        {
          concept: "De-duplicating Results with DISTINCT & Aliasing",
          what: "DISTINCT returns only unique combinations of selected columns. AS renames columns in the query output.",
          why: "A customer may have executed 50 transactions; SELECT DISTINCT user_id extracts unique active customers without duplicate rows.",
          how: "SELECT DISTINCT payment_gateway FROM transactions; SELECT amount * 0.18 AS gst_amount FROM transactions;",
          example: "SELECT DISTINCT state, city FROM user_addresses;",
          businessCase: "Extracting a clean, de-duplicated list of all mutual fund houses (AMCs) currently offering schemes on the platform.",
          pitfalls: "Applying DISTINCT to a query that includes a unique Primary Key (like transaction_id), which makes DISTINCT completely redundant."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 2: Queries with Constraints", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/select_queries_with_constraints", time: "20 mins", covers: "Interactive SELECT and projection practice." },
        { title: "SQL SELECT, DISTINCT, and Aliases Masterclass", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Select+Statement+Distinct+Alias", time: "30 mins", covers: "Core SQL querying syntax and alias best practices." },
        { title: "W3Schools SQL SELECT & SELECT DISTINCT Tutorial", platform: "W3Schools", url: "https://www.w3schools.com/sql/sql_distinct.asp", time: "20 mins", covers: "Syntax reference, examples, and interactive exercises." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 11 schema keys and data types." },
        { time: "50 mins", activity: "Concept Study: Study SELECT, DISTINCT, arithmetic expressions, and AS aliasing." },
        { time: "25 mins", activity: "Guided Practice: Execute queries on sample FinTech databases." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 projection challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Active Investor & Gateway Discovery Query Suite." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 12 assessment questions." }
      ],
      exercises: [
        {
          title: "Extract Unique Mutual Fund Asset Categories",
          problem: "Query the `mutual_funds` table to return a distinct list of all fund categories offered.",
          scenario: "Product manager needs to know how many asset categories exist on the platform.",
          instructions: "1. Use SELECT DISTINCT.\n2. Project column `category`.\n3. Alias as `unique_fund_category`.",
          expectedOutput: "De-duplicated list (Equity, Debt, Hybrid, Liquid, Index).",
          hint: "SELECT DISTINCT category AS unique_fund_category FROM mutual_funds;",
          solution: "SELECT DISTINCT category AS unique_fund_category FROM mutual_funds;"
        },
        {
          title: "Calculated Payout Column with Aliases",
          problem: "From `transactions`, select transaction_id, gross_amount, and compute platform fee (1.5% of amount) as `platform_fee` and net payout as `net_payout`.",
          scenario: "Merchant settlement report generation.",
          instructions: "1. Multiply gross_amount * 0.015 AS platform_fee.\n2. Compute gross_amount - (gross_amount * 0.015) AS net_payout.",
          expectedOutput: "Three columns with business-friendly headers.",
          hint: "Use standard arithmetic operators (*, -) inside SELECT.",
          solution: "SELECT transaction_id, gross_amount, gross_amount * 0.015 AS platform_fee, gross_amount - (gross_amount * 0.015) AS net_payout FROM transactions;"
        },
        {
          title: "De-duplicate Multi-Column Geographic Locations",
          problem: "Find all unique State and City combinations where platform investors reside.",
          scenario: "Regional marketing team wants to plan city-level onboarding webinars.",
          instructions: "1. Use SELECT DISTINCT state, city FROM users.\n2. Notice how DISTINCT evaluates the combination of both columns.",
          expectedOutput: "Unique pairs of state and city.",
          hint: "SELECT DISTINCT state, city FROM users;",
          solution: "SELECT DISTINCT state, city FROM users;"
        }
      ],
      assignment: {
        title: "Active Investor & FinTech Catalog Discovery Suite",
        scenario: "The analytics team needs baseline inventory and customer activity metrics from the core database.",
        deliverable: "Write 4 SQL queries:\n1. Extract unique payment gateways currently processing transactions.\n2. Extract unique customer IDs who have placed at least one SIP mandate.\n3. Project user full names with formatted email labels (`name AS customer_name`, `email AS primary_email`).\n4. Calculate annual commitment for SIPs (`monthly_amount * 12 AS annual_commitment`).",
        completionCriteria: "All 4 queries syntactically valid, formatted with uppercase SQL keywords and descriptive column aliases."
      },
      assessment: {
        mcqs: [
          { question: "Why is writing SELECT * generally considered bad practice in production queries?", options: ["It crashes the database server immediately.", "It retrieves unnecessary columns, increases network bandwidth consumption, and makes queries fragile to schema changes.", "SQL does not allow the asterisk symbol.", "It only works on small tables."], correct: 1, explanation: "SELECT * wastes I/O and RAM by retrieving columns your report doesn't need, and breaks code if a column is added or removed." },
          { question: "What does the query SELECT DISTINCT category, status FROM mutual_funds return?", options: ["Unique categories only.", "Unique statuses only.", "Unique combinations of category and status.", "An error."], correct: 2, explanation: "When multiple columns follow DISTINCT, SQL evaluates uniqueness across the combination of all listed columns." },
          { question: "Which keyword is used to rename a column in query output?", options: ["RENAME", "NAME", "AS", "TO"], correct: 2, explanation: "The AS keyword creates an alias for columns or tables in SQL queries." },
          { question: "Can you perform mathematical operations inside a SELECT statement?", options: ["No, SQL can only retrieve stored data.", "Yes, SQL supports standard arithmetic expressions (+, -, *, /) in projections.", "Only if using Excel.", "Only with stored procedures."], correct: 1, explanation: "SQL allows direct arithmetic expressions in SELECT projections (e.g. SELECT price * quantity AS total)." },
          { question: "If table `orders` has 1,000 rows, and 100 distinct users made 10 orders each, how many rows will SELECT DISTINCT user_id FROM orders return?", options: ["1,000", "10", "100", "10,000"], correct: 2, explanation: "DISTINCT collapses the duplicate user IDs down to the 100 unique users." }
        ],
        scenarios: [
          { question: "A query contains: SELECT DISTINCT user_id, transaction_id FROM transactions. Why does this return the exact same number of rows as SELECT user_id, transaction_id FROM transactions?", solution: "Because transaction_id is the unique Primary Key of the table. Since every transaction_id is already unique, every combination of user_id and transaction_id is inherently unique, making DISTINCT redundant." },
          { question: "How do you concatenate a user's `first_name` and `last_name` into a single `full_name` column in PostgreSQL / standard SQL?", solution: "Use the double pipe string concatenation operator: SELECT first_name || ' ' || last_name AS full_name FROM users; or use the CONCAT() function." },
          { question: "If you assign an alias in SELECT (e.g. SELECT amount * 12 AS annual_amount FROM sips), can you use `annual_amount` inside the WHERE clause of the same query?", solution: "No, in standard SQL, the WHERE clause is evaluated before the SELECT projection. The alias does not exist yet when WHERE executes. You must repeat the expression in WHERE or use a CTE/subquery." }
        ],
        miniAssignment: "Write a query that selects fund_id, fund_name, and calculates expense fee in rupees: (aum * (expense_ratio / 100)) AS annual_fee_inr."
      }
    },

    // DAY 13
    {
      day: 13, phase: "SQL", phaseId: 1,
      title: "Row-Level Filtering: WHERE Clause & Comparison Operators",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Master the WHERE clause: filter records before aggregation or projection.",
        "Use comparison operators: =, !=, <>, <, >, <=, >=.",
        "Implement range checks with BETWEEN ... AND ... and membership tests with IN (...).",
        "Combine complex boolean logic using AND, OR, NOT and explicit parentheses precedence."
      ],
      prerequisites: "Day 12 SELECT and projection basics.",
      expectedOutcome: "The ability to filter production transaction databases by date intervals, transaction amounts, payment modes, and operational status codes.",
      topics: [
        {
          concept: "WHERE Clause Execution & Comparison Operators",
          what: "The WHERE clause acts as an individual row gatekeeper, evaluating true/false conditions for every record on disk.",
          why: "Fintech databases store millions of transactions; querying without row filters crashes memory and returns irrelevant noise.",
          how: "SELECT * FROM transactions WHERE amount >= 50000 AND status = 'FAILED';",
          example: "SELECT * FROM users WHERE state = 'Karnataka' AND kyc_status = 'VERIFIED';",
          businessCase: "Isolating high-value failed transactions to alert the VIP operations concierge team.",
          pitfalls: "Forgetting that string literals in SQL require single quotes ('Success'), whereas column identifiers use no quotes or double quotes."
        },
        {
          concept: "IN, BETWEEN, and Logical Precedence (AND over OR)",
          what: "IN replaces multiple OR statements. BETWEEN checks inclusive ranges. AND takes precedence over OR without parentheses.",
          why: "Writing `status = 'FAILED' OR status = 'CANCELLED' AND amount > 10000` evaluates as `status = 'FAILED' OR (status = 'CANCELLED' AND amount > 10000)` due to operator precedence, returning ₹10 failed transactions unexpectedly.",
          how: "Use explicit parentheses: `(status = 'FAILED' OR status = 'CANCELLED') AND amount > 10000`. Use `IN ('FAILED', 'CANCELLED')`.",
          example: "SELECT * FROM mutual_funds WHERE risk_level IN ('Moderate', 'High') AND min_sip BETWEEN 500 AND 5000;",
          businessCase: "Compliance audit selecting all transactions executed between fiscal quarter dates and processed by specific banking partners.",
          pitfalls: "Omitting parentheses when mixing AND and OR operators in compliance-critical queries."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 3: Queries with Constraints (Pt. 2)", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/select_queries_with_constraints_pt_2", time: "20 mins", covers: "Operators, BETWEEN, IN, and logical expressions." },
        { title: "SQL WHERE Clause, Operators, and AND/OR Logic", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Where+Statement+Tutorial", time: "30 mins", covers: "Filtering rows and operator precedence." },
        { title: "PostgreSQL WHERE Clause Reference", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-WHERE", time: "20 mins", covers: "Official documentation on row filtering." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 12 SELECT and DISTINCT queries." },
        { time: "50 mins", activity: "Concept Study: Study WHERE syntax, comparison operators, IN, BETWEEN, and boolean logic." },
        { time: "25 mins", activity: "Guided Practice: Replicate multi-condition filtering on financial records." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 WHERE filtering challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: High-Risk & Failed Mandate Investigation Suite." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 13 assessment questions." }
      ],
      exercises: [
        {
          title: "Filter High-Value Failed UPI Transactions",
          problem: "Find all transactions where `payment_mode` is 'UPI', `status` is 'FAILED', and `amount` is greater than or equal to ₹25,000.",
          scenario: "Operations escalation for VIP customer payment drops.",
          instructions: "1. SELECT relevant columns.\n2. Combine conditions with AND.\n3. Wrap string literals in single quotes.",
          expectedOutput: "List of high-value failed UPI transactions.",
          hint: "WHERE payment_mode = 'UPI' AND status = 'FAILED' AND amount >= 25000",
          solution: "SELECT txn_id, user_id, amount, created_at FROM transactions WHERE payment_mode = 'UPI' AND status = 'FAILED' AND amount >= 25000;"
        },
        {
          title: "Membership Test with IN and Range with BETWEEN",
          problem: "Select all mutual funds where `category` is either 'Equity', 'Hybrid', or 'Index' AND `expense_ratio` is between 0.5% and 1.5%.",
          scenario: "Curating a list of low-cost funds for beginner investors.",
          instructions: "1. Use IN ('Equity', 'Hybrid', 'Index').\n2. Use BETWEEN 0.5 AND 1.5.",
          expectedOutput: "Filtered mutual fund schemes.",
          hint: "WHERE category IN ('Equity', 'Hybrid', 'Index') AND expense_ratio BETWEEN 0.5 AND 1.5",
          solution: "SELECT fund_id, fund_name, category, expense_ratio FROM mutual_funds WHERE category IN ('Equity', 'Hybrid', 'Index') AND expense_ratio BETWEEN 0.5 AND 1.5;"
        },
        {
          title: "Fixing Precedence Bugs in Compliance Audit",
          problem: "A junior analyst wrote: `WHERE status = 'FAILED' OR status = 'DISPUTED' AND amount > 50000`. Fix the query so the amount threshold applies to BOTH statuses.",
          scenario: "Preventing low-value failed transactions from cluttering a high-value fraud review report.",
          instructions: "1. Add parentheses around the OR condition.\n2. Explain why the original query failed.",
          expectedOutput: "Only failed or disputed transactions over ₹50,000.",
          hint: "WHERE (status = 'FAILED' OR status = 'DISPUTED') AND amount > 50000",
          solution: "SELECT * FROM transactions WHERE (status = 'FAILED' OR status = 'DISPUTED') AND amount > 50000;"
        }
      ],
      assignment: {
        title: "FinTech High-Risk & Failed Mandate Investigation Suite",
        scenario: "Audit 10,000 monthly transactions to isolate operational risk events for the quarterly compliance review.",
        deliverable: "Write 4 SQL queries:\n1. Find all active SIP mandates with `monthly_amount` >= ₹10,000 where payment method is 'eNACH'.\n2. Find all failed transactions where error code is either 'INSUFFICIENT_FUNDS' or 'MANDATE_EXPIRED'.\n3. Find transactions executed in October 2024 with amounts between ₹1,000 and ₹5,000.\n4. Find all verified users who live in 'Tamil Nadu', 'Karnataka', or 'Kerala' who registered in 2024.",
        completionCriteria: "Accurate queries utilizing IN, BETWEEN, boolean grouping, and validated single-quoted literals."
      },
      assessment: {
        mcqs: [
          { question: "In SQL boolean evaluation, which operator has higher precedence by default?", options: ["OR has higher precedence than AND.", "AND has higher precedence than OR.", "They have equal precedence and evaluate left-to-right.", "NOT has the lowest precedence."], correct: 1, explanation: "AND takes precedence over OR in SQL. Always use parentheses () when combining them to ensure intended business logic." },
          { question: "What does the query SELECT * FROM orders WHERE amount BETWEEN 100 AND 500 do?", options: ["Selects amounts strictly greater than 100 and strictly less than 500.", "Selects amounts inclusively from 100 up to and including 500.", "Selects 100 random orders.", "Throws a syntax error."], correct: 1, explanation: "The BETWEEN operator in SQL is inclusive of both endpoints (equivalent to amount >= 100 AND amount <= 500)." },
          { question: "Which clause is equivalent to WHERE bank_code IN ('SBI', 'HDFC', 'ICICI')?", options: ["WHERE bank_code = 'SBI' AND bank_code = 'HDFC' AND bank_code = 'ICICI'", "WHERE bank_code = 'SBI' OR bank_code = 'HDFC' OR bank_code = 'ICICI'", "WHERE bank_code LIKE 'SBI%'", "WHERE bank_code IS ('SBI', 'HDFC')"], correct: 1, explanation: "IN ('A', 'B', 'C') is shorthand for a series of OR equality comparisons on the same column." },
          { question: "How do you test for inequality in standard SQL?", options: ["!= or <>", "==", "NOT =", "~="], correct: 0, explanation: "Both != and <> represent 'not equal to' in standard SQL." },
          { question: "Why does WHERE status = \"SUCCESS\" fail in PostgreSQL?", options: ["PostgreSQL requires double quotes for strings.", "In standard SQL, double quotes denote column/table identifiers, while single quotes ('SUCCESS') denote text string literals.", "PostgreSQL does not support strings.", "The word SUCCESS is reserved."], correct: 1, explanation: "Single quotes are mandatory for string literals in SQL; double quotes are reserved for database object identifiers." }
        ],
        scenarios: [
          { question: "A stakeholder wants all transactions between Oct 1 and Oct 31. Why might WHERE txn_date BETWEEN '2024-10-01' AND '2024-10-31' miss transactions made on October 31 at 4:30 PM?", solution: "'2024-10-31' defaults to midnight '2024-10-31 00:00:00'. Any transaction occurring later that day is excluded. To capture the full day, use: WHERE txn_date >= '2024-10-01' AND txn_date < '2024-11-01'." },
          { question: "How does the NOT operator interact with the IN operator (e.g. WHERE user_id NOT IN (1, 2, 3))?", solution: "It excludes records whose user_id matches any of the values in the set. Caution: if the set contains a NULL value (e.g. NOT IN (1, 2, NULL)), the entire expression evaluates to UNKNOWN and returns zero rows." },
          { question: "Why should you avoid wrapping filtered columns in functions in the WHERE clause (e.g. WHERE YEAR(created_at) = 2024)?", solution: "Applying functions to column names (non-sargable queries) prevents the database from using indexes on that column, forcing a slow, expensive full-table scan. Instead, write: WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'." }
        ],
        miniAssignment: "Write a query selecting all users from `users` where kyc_status != 'VERIFIED' AND (phone IS NOT NULL OR email IS NOT NULL)."
      }
    },

    // DAY 14 (Weekly Assessment 2)
    {
      day: 14, phase: "SQL", phaseId: 1,
      title: "Pattern Matching, Nullability & Sorting [Weekly Assessment 2]",
      difficulty: "Beginner-Intermediate", duration: 180,
      objectives: [
        "Master pattern matching with LIKE, ILIKE, and wildcards (% for multiple characters, _ for single character).",
        "Understand three-valued logic (TRUE, FALSE, UNKNOWN) and why column = NULL always evaluates to UNKNOWN.",
        "Handle missing data using IS NULL, IS NOT NULL, and COALESCE fallback replacements.",
        "Sort query results using ORDER BY (ASC, DESC), multi-column sorting, and paginate with LIMIT and OFFSET.",
        "Synthesize Weeks 1–2 competencies in the comprehensive Weekly Assessment 2."
      ],
      prerequisites: "Days 11-13 SQL querying and filtering.",
      expectedOutcome: "The ability to search text fields, handle missing KYC/banking values, sort leaderboards, and paginate API responses cleanly.",
      topics: [
        {
          concept: "Pattern Matching (LIKE / ILIKE) & Wildcard Mechanics",
          what: "LIKE tests string patterns using `%` (zero or more characters) and `_` (exactly one character). ILIKE performs case-insensitive matching.",
          why: "Users search for funds by partial names ('nifty', 'tech', 'tata'); banks have codes like 'HDFC%' and 'SBIN%'.",
          how: "SELECT * FROM mutual_funds WHERE fund_name ILIKE '%nifty 50%';",
          example: "'_SBI%' matches any 4-character code ending in SBI followed by anything. '98%54' matches phone numbers starting with 98 and ending with 54.",
          businessCase: "Customer support search bar allowing agents to find transactions by partial customer email or narration fragment.",
          pitfalls: "Placing a wildcard at the beginning of a pattern (`%term`) prevents database B-Tree index utilization, causing sequential table scans."
        },
        {
          concept: "Three-Valued Logic & The NULL Trap",
          what: "NULL represents missing, unknown, or unrecorded data. It is NOT equal to 0, empty string (''), or another NULL.",
          why: "Writing `WHERE pan_number = NULL` returns zero rows because NULL = NULL evaluates to UNKNOWN, not TRUE. You must use `IS NULL`.",
          how: "SELECT user_id, COALESCE(referral_code, 'ORGANIC') AS source FROM users WHERE kyc_verified_at IS NULL;",
          example: "COALESCE(phone, email, 'NO_CONTACT') returns the first non-null argument.",
          businessCase: "Identifying newly registered users who have not yet submitted KYC documents (kyc_submitted_at IS NULL).",
          pitfalls: "Using standard comparison operators (=, !=) with NULL instead of IS NULL / IS NOT NULL."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 4: Filtering and Dealing with NULLs", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/filtering_sorting_query_results", time: "20 mins", covers: "ORDER BY, LIMIT, and NULL handling." },
        { title: "SQL Pattern Matching with LIKE & NULL Handling Tutorial", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Like+Null+Order+By", time: "30 mins", covers: "Wildcards, ILIKE, IS NULL, and sorting." },
        { title: "PostgreSQL Documentation on NULLs and Sorting", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/queries-order.html", time: "20 mins", covers: "ORDER BY ASC/DESC, NULLS FIRST/LAST, and LIMIT/OFFSET." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 13 WHERE clauses and operator precedence." },
        { time: "50 mins", activity: "Concept Study: Study LIKE/ILIKE, NULL three-valued logic, COALESCE, and ORDER BY." },
        { time: "25 mins", activity: "Guided Practice: Replicate text searches, NULL audits, and sorted leaderboards." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 pattern matching and sorting challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Complete Weekly Assessment 2 Query Suite." },
        { time: "20 mins", activity: "Quiz & Review: Complete Weekly Assessment 2 assessment questions." }
      ],
      exercises: [
        {
          title: "Find All PSU Bank Customers via IFSC Wildcards",
          problem: "Select all accounts from `bank_accounts` where IFSC starts with 'SBIN' or 'PUNB' using pattern matching.",
          scenario: "Operations routing for public sector bank scheduled downtime maintenance window.",
          instructions: "1. Use WHERE with LIKE or ILIKE.\n2. Match 'SBIN%' OR 'PUNB%'.",
          expectedOutput: "List of all SBI and Punjab National Bank customer accounts.",
          hint: "WHERE ifsc_code LIKE 'SBIN%' OR ifsc_code LIKE 'PUNB%'",
          solution: "SELECT account_id, user_id, ifsc_code, bank_name FROM bank_accounts WHERE ifsc_code LIKE 'SBIN%' OR ifsc_code LIKE 'PUNB%';"
        },
        {
          title: "Audit Incomplete KYC Submissions with IS NULL & COALESCE",
          problem: "List users whose `pan_number` is missing, replacing null `referral_code` with the string 'DIRECT_SIGNUP'.",
          scenario: "CRM campaign to remind incomplete signups to submit PAN card.",
          instructions: "1. Filter with WHERE pan_number IS NULL.\n2. In SELECT, use COALESCE(referral_code, 'DIRECT_SIGNUP').",
          expectedOutput: "Users missing PAN with normalized acquisition source.",
          hint: "COALESCE(referral_code, 'DIRECT_SIGNUP') ... WHERE pan_number IS NULL",
          solution: "SELECT user_id, email, COALESCE(referral_code, 'DIRECT_SIGNUP') AS acquisition_source FROM users WHERE pan_number IS NULL;"
        },
        {
          title: "Top 5 Largest Transactions Paginated Leaderboard",
          problem: "Find the top 5 largest successful transactions executed in 2024, sorted from highest to lowest amount.",
          scenario: "High-net-worth investor recognition report.",
          instructions: "1. Filter status = 'SUCCESS'.\n2. ORDER BY amount DESC.\n3. LIMIT 5.",
          expectedOutput: "Top 5 transaction records sorted in descending order.",
          hint: "ORDER BY amount DESC LIMIT 5",
          solution: "SELECT txn_id, user_id, amount, created_at FROM transactions WHERE status = 'SUCCESS' ORDER BY amount DESC LIMIT 5;"
        }
      ],
      assignment: {
        title: "Weekly Assessment 2: FinTech Customer & Transaction Intelligence Suite",
        scenario: "Synthesize Weeks 1–2 SQL capabilities into a production audit script analyzing user onboarding, search, and settlement health.",
        deliverable: "Write 5 production SQL queries:\n1. Search mutual funds containing 'Index' or 'Nifty' in name, sorted by `expense_ratio` ascending.\n2. Identify customers with active SIPs who have NEVER completed their email verification (`email_verified_at IS NULL`).\n3. Extract all customer emails ending in `@gmail.com` registered in the last 60 days.\n4. Rank the top 10 highest-value investment transactions, displaying `NULLS LAST` for any pending settlements.\n5. Write pagination logic: Retrieve page 2 of active investors (10 records per page, OFFSET 10 LIMIT 10).",
        completionCriteria: "All 5 queries syntactically verified, correctly utilizing LIKE, IS NULL, COALESCE, ORDER BY, and pagination."
      },
      assessment: {
        mcqs: [
          { question: "What is the result of the SQL expression SELECT NULL = NULL;", options: ["TRUE", "FALSE", "UNKNOWN / NULL", "0"], correct: 2, explanation: "In SQL's three-valued logic, NULL represents an unknown value. You cannot equate two unknowns, so NULL = NULL evaluates to UNKNOWN." },
          { question: "Which function returns the first non-null value from a list of arguments?", options: ["IFNULL()", "NVL()", "COALESCE()", "NULLIF()"], correct: 2, explanation: "COALESCE(val1, val2, ...) is standard ANSI SQL and returns the first non-null expression from left to right." },
          { question: "What does the wildcard underscore (_) represent in a LIKE pattern?", options: ["Any sequence of characters.", "Exactly one single character.", "A whitespace character.", "An underscore character."], correct: 1, explanation: "The underscore (_) matches exactly one single character, while the percent sign (%) matches zero or more characters." },
          { question: "In what order does ORDER BY sort query results if neither ASC nor DESC is specified?", options: ["DESC (Descending)", "ASC (Ascending)", "Random order", "Primary Key order"], correct: 1, explanation: "By default, SQL sorts in ascending order (ASC) if the sort direction is omitted." },
          { question: "How do you retrieve records 21 through 30 from a query using pagination?", options: ["LIMIT 30 OFFSET 20", "LIMIT 10 OFFSET 20", "RANGE 21 TO 30", "PAGINATE(2, 10)"], correct: 1, explanation: "LIMIT 10 fetches 10 records; OFFSET 20 skips the first 20 records (rows 1-20), returning rows 21-30." }
        ],
        scenarios: [
          { question: "Why does WHERE column != 'PROMOTIONAL' fail to return rows where `column` is NULL?", solution: "When `column` is NULL, NULL != 'PROMOTIONAL' evaluates to UNKNOWN. SQL's WHERE clause only keeps rows where the condition evaluates to TRUE. To include NULLs, write: WHERE column != 'PROMOTIONAL' OR column IS NULL." },
          { question: "How do you ensure NULL values appear at the very bottom when sorting a column in descending order in PostgreSQL?", solution: "Use the NULLS LAST directive: ORDER BY amount DESC NULLS LAST. By default in PostgreSQL, DESC puts NULLs first." },
          { question: "What is the performance implication of searching with WHERE email LIKE '%@gmail.com' versus WHERE email LIKE 'rajesh%'?", solution: "A leading wildcard ('%@gmail.com') prevents B-Tree index scans because the search term does not have a fixed prefix, forcing the database to read every single row in the table (Full Table Scan)." }
        ],
        miniAssignment: "Write a query that lists users with missing phone numbers, displaying their email in uppercase and sorted by creation date descending."
      }
    },

    // DAY 15
    {
      day: 15, phase: "SQL", phaseId: 1,
      title: "Quantitative Summaries: Aggregate Functions & Column Statistics",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master SQL quantitative aggregate functions: COUNT(), SUM(), AVG(), MIN(), MAX().",
        "Understand the crucial difference between COUNT(*) (counts rows) and COUNT(column) (counts non-null values).",
        "Use DISTINCT inside aggregate functions (e.g. COUNT(DISTINCT user_id)).",
        "Calculate quantitative baseline statistics for platform Gross Merchandise Value (GMV) and SIP performance."
      ],
      prerequisites: "Days 11-14 queries, filtering, and nullability.",
      expectedOutcome: "The ability to compute financial totals, transacting user counts, average ticket sizes, and volume metrics across large database tables.",
      topics: [
        {
          concept: "SQL Aggregate Functions & NULL Treatment",
          what: "Aggregate functions compute a single summary value across a set of rows. SUM, AVG, MIN, and MAX ignore NULL values automatically.",
          why: "Calculating mean investment size without accounting for how SQL handles NULLs or zero values leads to distorted financial metrics.",
          how: "SELECT COUNT(*) AS total_txns, SUM(amount) AS total_gmv, AVG(amount) AS avg_ticket, MIN(amount) AS min_txn, MAX(amount) AS max_txn FROM transactions WHERE status = 'SUCCESS';",
          example: "SELECT AVG(expense_ratio) AS avg_fee FROM mutual_funds;",
          businessCase: "Generating daily platform executive health metrics: Total Inflow Volume, Successful Payment Count, and Average Deposit Amount.",
          pitfalls: "Assuming AVG(column) includes NULL rows as zero. (It ignores NULLs entirely, reducing the denominator)."
        },
        {
          concept: "COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column)",
          what: "COUNT(*) counts total table rows. COUNT(col) counts rows where col is not null. COUNT(DISTINCT col) counts unique non-null values.",
          why: "If 100 users made 500 transactions, COUNT(*) returns 500 (transaction count), but COUNT(DISTINCT user_id) returns 100 (investor count).",
          how: "SELECT COUNT(*) AS total_orders, COUNT(DISTINCT user_id) AS unique_buyers FROM transactions;",
          example: "SELECT COUNT(DISTINCT category) FROM mutual_funds; returns 5 unique categories.",
          businessCase: "Calculating customer engagement: dividing total transactions by unique active investors to compute average transaction frequency.",
          pitfalls: "Writing COUNT(user_id) when you needed COUNT(DISTINCT user_id), drastically overcounting customer reach."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 10: Queries with Aggregates (Pt. 1)", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/select_queries_with_aggregates", time: "25 mins", covers: "COUNT, SUM, AVG, MIN, MAX syntax." },
        { title: "SQL Aggregate Functions Deep Dive", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Aggregate+Functions+COUNT+SUM+AVG", time: "30 mins", covers: "Aggregation calculations and distinct counting." },
        { title: "PostgreSQL Aggregate Functions Official Guide", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/functions-aggregate.html", time: "20 mins", covers: "Official documentation on aggregates." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 14 LIKE, NULL handling, and ORDER BY." },
        { time: "50 mins", activity: "Concept Study: Study COUNT(*), COUNT(col), SUM, AVG, MIN, MAX, and DISTINCT aggregates." },
        { time: "25 mins", activity: "Guided Practice: Replicate financial summary calculations on sample data." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 aggregate calculation challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Platform GMV & SIP Portfolio Health Audit." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 15 assessment questions." }
      ],
      exercises: [
        {
          title: "Compute Total Inflow Volume and Active Investor Count",
          problem: "From `transactions`, calculate total successful volume, total successful transactions, and unique transacting investors.",
          scenario: "Daily executive morning flash report.",
          instructions: "1. Filter WHERE status = 'SUCCESS'.\n2. Compute SUM(amount), COUNT(*), and COUNT(DISTINCT user_id).",
          expectedOutput: "Three summary metric values with descriptive aliases.",
          hint: "SELECT SUM(amount) AS total_gmv, COUNT(*) AS txn_count, COUNT(DISTINCT user_id) AS unique_investors",
          solution: "SELECT SUM(amount) AS total_gmv, COUNT(*) AS txn_count, COUNT(DISTINCT user_id) AS unique_investors FROM transactions WHERE status = 'SUCCESS';"
        },
        {
          title: "Audit Data Hygiene: Total Rows vs Populated Banking Accounts",
          problem: "Compare total user records against users with recorded bank accounts and users with verified PANs.",
          scenario: "Identifying customer drop-off during the onboarding funnel.",
          instructions: "1. Use COUNT(*) for total users.\n2. Use COUNT(bank_account_id) for banking users.\n3. Use COUNT(pan_number) for PAN verified.",
          expectedOutput: "Funnel count metrics showing attrition across steps.",
          hint: "COUNT(*) counts all; COUNT(column) ignores nulls.",
          solution: "SELECT COUNT(*) AS total_signups, COUNT(bank_account_id) AS users_with_bank, COUNT(pan_number) AS users_with_pan FROM users;"
        },
        {
          title: "Calculate Highest, Lowest and Average SIP Ticket Size",
          problem: "From `sip_mandates`, calculate the minimum, maximum, and average monthly commitment for active mandates.",
          scenario: "Risk management evaluating exposure to micro-SIPs vs large ticket investors.",
          instructions: "1. Filter WHERE status = 'ACTIVE'.\n2. Compute MIN(monthly_amount), MAX(monthly_amount), and ROUND(AVG(monthly_amount), 2).",
          expectedOutput: "Min, Max, and Mean monthly SIP amounts.",
          hint: "SELECT MIN(monthly_amount), MAX(monthly_amount), ROUND(AVG(monthly_amount), 2) FROM sip_mandates WHERE status = 'ACTIVE';",
          solution: "SELECT MIN(monthly_amount) AS min_sip, MAX(monthly_amount) AS max_sip, ROUND(AVG(monthly_amount), 2) AS avg_sip FROM sip_mandates WHERE status = 'ACTIVE';"
        }
      ],
      assignment: {
        title: "FinTech Platform GMV & Operational Volume Reconciliation",
        scenario: "Audit transactional ledger totals for Q3 2024 to support quarterly financial reporting.",
        deliverable: "Write 4 SQL queries:\n1. Total GMV processed and average ticket size for successful transactions in Q3 2024.\n2. Total value and count of failed transactions.\n3. Unique mutual fund schemes that received at least one investment.\n4. Total unique users who transacted via 'UPI' versus 'NetBanking'.",
        completionCriteria: "Accurate quantitative summaries utilizing aggregate functions with round formatting and distinct counts."
      },
      assessment: {
        mcqs: [
          { question: "What is the difference between COUNT(*) and COUNT(email)?", options: ["There is no difference.", "COUNT(*) counts all rows in the result set; COUNT(email) counts only rows where email is NOT NULL.", "COUNT(email) counts duplicate emails only.", "COUNT(*) is slower and deprecated."], correct: 1, explanation: "COUNT(*) counts table rows regardless of content; COUNT(column) only counts rows where that specific column contains a non-null value." },
          { question: "How does the AVG() function treat NULL values in a column?", options: ["It treats them as zeros.", "It completely ignores NULL values, excluding them from both the sum and the row count denominator.", "It returns NULL for the entire query.", "It throws an error."], correct: 1, explanation: "Aggregate functions (SUM, AVG, MIN, MAX) skip NULL values entirely, meaning the denominator of AVG() is only the count of non-null rows." },
          { question: "What does the query SELECT COUNT(DISTINCT state) FROM users return?", options: ["A list of all state names.", "The total number of unique non-null states represented by users.", "The count of users in the largest state.", "An error."], correct: 1, explanation: "COUNT(DISTINCT column) calculates the scalar count of unique, distinct non-null entries." },
          { question: "Can you select an unaggregated column alongside an aggregate function without a GROUP BY clause (e.g. SELECT user_id, SUM(amount) FROM transactions;)?", options: ["Yes, SQL fills missing rows automatically.", "No, SQL throws an error because user_id has multiple rows while SUM(amount) produces a single scalar value.", "Only in MySQL.", "Yes, if using DISTINCT."], correct: 1, explanation: "You cannot mix row-level columns and aggregate calculations without specifying how to group the rows using GROUP BY." },
          { question: "Which function finds the earliest transaction timestamp in a table?", options: ["FIRST()", "MIN(created_at)", "EARLIEST()", "BOTTOM()"], correct: 1, explanation: "MIN() on a date or timestamp column returns the earliest chronological date." }
        ],
        scenarios: [
          { question: "If 5 customers have investments of [₹1,000, ₹2,000, NULL, ₹3,000, NULL], what will SELECT AVG(amount) return, and what will SELECT SUM(amount)/COUNT(*) return?", solution: "AVG(amount) ignores NULLs, calculating (1000+2000+3000)/3 = ₹2,000. SUM(amount)/COUNT(*) calculates (6000)/5 = ₹1,200. If NULL represents ₹0, you must use COALESCE: AVG(COALESCE(amount, 0)) to get ₹1,200." },
          { question: "How can you calculate the transaction failure rate percentage using aggregate functions in a single query?", solution: "Use conditional aggregation: SELECT ROUND(100.0 * COUNT(CASE WHEN status = 'FAILED' THEN 1 END) / COUNT(*), 2) AS failure_rate_pct FROM transactions;" },
          { question: "Why does SELECT SUM(amount) FROM transactions WHERE status = 'UNKNOWN_STATUS' return NULL instead of 0?", solution: "When no rows match the WHERE clause, SUM() returns NULL. To guarantee a numeric 0 output for empty query results, wrap it in COALESCE: SELECT COALESCE(SUM(amount), 0) FROM transactions..." }
        ],
        miniAssignment: "Write a query that computes total revenue, average order value, and count of distinct customers from an orders table for orders with status = 'COMPLETE'."
      }
    },

    // DAY 16
    {
      day: 16, phase: "SQL", phaseId: 1,
      title: "Multi-Dimensional Grouping: GROUP BY & HAVING Clause",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master the GROUP BY clause to aggregate data across one or more categorical dimensions.",
        "Understand the fundamental difference between WHERE (filters rows before aggregation) and HAVING (filters aggregated groups).",
        "Implement multi-column groupings (e.g. grouping by Year, Month, and Gateway).",
        "Diagnose and resolve common SQL grouping errors ('column must appear in the GROUP BY clause or be used in an aggregate function')."
      ],
      prerequisites: "Day 15 aggregate functions.",
      expectedOutcome: "The ability to build multi-dimensional operational summaries comparing gateway performance, monthly trends, and filtering aggregated results using HAVING.",
      topics: [
        {
          concept: "GROUP BY Dimensional Aggregation",
          what: "GROUP BY collapses rows with identical values in specified columns into summary rows, calculating aggregates for each distinct group.",
          why: "This is the SQL equivalent of an Excel Pivot Table, answering 'What was the volume for each payment gateway?' or 'How many users live in each state?'",
          how: "SELECT payment_gateway, COUNT(*) AS txn_count, SUM(amount) AS total_volume FROM transactions GROUP BY payment_gateway;",
          example: "SELECT category, AVG(expense_ratio) FROM mutual_funds GROUP BY category;",
          businessCase: "Calculating monthly GMV, transaction success count, and average deposit for each payment gateway partner.",
          pitfalls: "Including a non-aggregated column in the SELECT list without including it in the GROUP BY clause."
        },
        {
          concept: "HAVING vs WHERE: Order of Execution",
          what: "WHERE filters individual rows before grouping takes place. HAVING filters aggregated group metrics after GROUP BY has calculated them.",
          why: "You cannot write `WHERE SUM(amount) > 100000` because row-level filtering happens before sums exist. You must write `HAVING SUM(amount) > 100000`.",
          how: "SELECT user_id, SUM(amount) FROM transactions WHERE status = 'SUCCESS' GROUP BY user_id HAVING SUM(amount) >= 500000;",
          example: "SELECT gateway, COUNT(*) FROM transactions WHERE status = 'FAILED' GROUP BY gateway HAVING COUNT(*) > 100;",
          businessCase: "Identifying payment gateways whose failure count exceeded 500 in a single day for vendor SLA penalty claims.",
          pitfalls: "Using HAVING to filter row-level attributes (like `HAVING status = 'SUCCESS'`) which slows performance by bypassing indexes."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 11: Queries with Aggregates (Pt. 2)", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/select_queries_with_aggregates_pt_2", time: "25 mins", covers: "GROUP BY and HAVING clauses." },
        { title: "GROUP BY and HAVING Explained Visually", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Group+By+Having+Clause", time: "30 mins", covers: "Grouping mechanics and filtering grouped results." },
        { title: "PostgreSQL GROUP BY & HAVING Documentation", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP", time: "20 mins", covers: "Official guide on grouping expressions." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 15 aggregate functions and distinct counts." },
        { time: "50 mins", activity: "Concept Study: Study GROUP BY syntax, multi-column grouping, and HAVING vs WHERE." },
        { time: "25 mins", activity: "Guided Practice: Replicate gateway performance and regional volume aggregations." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 GROUP BY and HAVING challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Payment Gateway SLA & High-Volume Investor Matrix." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 16 assessment questions." }
      ],
      exercises: [
        {
          title: "Group Volume by Payment Gateway and Status",
          problem: "Aggregate transactions to display payment gateway, status, total count, and total volume.",
          scenario: "Comparing operational throughput across gateway partners.",
          instructions: "1. SELECT payment_gateway, status, COUNT(*), SUM(amount).\n2. GROUP BY payment_gateway, status.\n3. ORDER BY payment_gateway, total_volume DESC.",
          expectedOutput: "Multi-column breakdown showing volume and counts per status for each gateway.",
          hint: "GROUP BY payment_gateway, status",
          solution: "SELECT payment_gateway, status, COUNT(*) AS txn_count, SUM(amount) AS total_volume FROM transactions GROUP BY payment_gateway, status ORDER BY payment_gateway, total_volume DESC;"
        },
        {
          title: "Filter High-Volume Investors with HAVING",
          problem: "Find all users whose total successful investment volume is greater than or equal to ₹500,000 (HNW investors).",
          scenario: "Wealth management team customer outreach list.",
          instructions: "1. Filter row-level WHERE status = 'SUCCESS'.\n2. GROUP BY user_id.\n3. Filter groups with HAVING SUM(amount) >= 500000.",
          expectedOutput: "User IDs with their total accumulated investment above 5 Lakhs.",
          hint: "WHERE status = 'SUCCESS' GROUP BY user_id HAVING SUM(amount) >= 500000",
          solution: "SELECT user_id, SUM(amount) AS total_invested, COUNT(*) AS txn_count FROM transactions WHERE status = 'SUCCESS' GROUP BY user_id HAVING SUM(amount) >= 500000 ORDER BY total_invested DESC;"
        },
        {
          title: "Identify Problematic Gateways with High Failure Counts",
          problem: "Identify payment gateways that had more than 50 failed transactions in the current month.",
          scenario: "Automated operational health monitoring.",
          instructions: "1. Filter status = 'FAILED'.\n2. GROUP BY payment_gateway.\n3. HAVING COUNT(*) > 50.",
          expectedOutput: "Gateways breaching operational error thresholds.",
          hint: "HAVING COUNT(*) > 50",
          solution: "SELECT payment_gateway, COUNT(*) AS failed_count, SUM(amount) AS lost_volume FROM transactions WHERE status = 'FAILED' GROUP BY payment_gateway HAVING COUNT(*) > 50;"
        }
      ],
      assignment: {
        title: "FinTech Payment Gateway SLA & Regional Performance Audit",
        scenario: "Produce an executive partner review analyzing volume, success ratios, and SLA breaches across payment partners.",
        deliverable: "Write 4 SQL queries:\n1. Total transaction volume and average ticket size grouped by `mutual_fund_category`.\n2. Total successful investment grouped by state, displaying only states with total volume > ₹10,00,000.\n3. Monthly SIP execution count grouped by `bank_name`, sorted from highest to lowest.\n4. Identify all users who have executed more than 5 failed transactions.",
        completionCriteria: "Accurate queries utilizing single and multi-column GROUP BY with correctly applied HAVING filters."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary difference between the WHERE clause and the HAVING clause?", options: ["WHERE filters individual rows before grouping; HAVING filters aggregated groups after grouping.", "WHERE is for numbers; HAVING is for text.", "They are completely interchangeable.", "HAVING is deprecated in modern SQL."], correct: 0, explanation: "WHERE filters rows before they enter the aggregation engine. HAVING filters the summary groups after aggregates have been calculated." },
          { question: "What happens if you run: SELECT user_id, state, COUNT(*) FROM users GROUP BY state;", options: ["SQL groups by state and picks a random user_id.", "The database throws an error because user_id is neither aggregated nor included in the GROUP BY clause.", "It works without issue in all databases.", "It groups by both columns automatically."], correct: 1, explanation: "Every column in the SELECT list that is not part of an aggregate function MUST be included in the GROUP BY clause." },
          { question: "Can you use column aliases defined in SELECT inside the HAVING clause in standard SQL?", options: ["Yes, always.", "No, standard SQL does not allow SELECT aliases in HAVING because HAVING executes before SELECT.", "Only if using Excel.", "Only in subqueries."], correct: 1, explanation: "In the SQL order of execution (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT), HAVING executes before SELECT, so aliases are not yet recognized." },
          { question: "Which clause is executed first by the database engine?", options: ["SELECT", "WHERE", "GROUP BY", "HAVING"], correct: 1, explanation: "The logical order of execution is: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT." },
          { question: "How do you group by multiple columns in SQL?", options: ["GROUP BY col1 AND col2", "GROUP BY col1, col2", "GROUP BY (col1, col2)", "GROUP MULTI col1, col2"], correct: 1, explanation: "Multiple grouping columns are separated by commas: GROUP BY col1, col2." }
        ],
        scenarios: [
          { question: "Why is writing SELECT gateway, COUNT(*) FROM transactions GROUP BY gateway HAVING status = 'FAILED'; poor SQL practice?", solution: "`status` is a row-level column, not an aggregate. Filtering row-level attributes belongs in the WHERE clause (WHERE status = 'FAILED' GROUP BY gateway). Putting it in HAVING prevents index usage and degrades query speed." },
          { question: "How can you count how many distinct schemes each mutual fund house (AMC) offers, showing only AMCs with at least 5 schemes?", solution: "SELECT amc_name, COUNT(DISTINCT fund_id) AS scheme_count FROM mutual_funds GROUP BY amc_name HAVING COUNT(DISTINCT fund_id) >= 5 ORDER BY scheme_count DESC;" },
          { question: "What does GROUP BY 1, 2 mean in SQL queries, and why do some production style guides discourage it?", solution: "GROUP BY 1, 2 refers to the first and second columns in the SELECT clause by position. While convenient in ad-hoc queries, production style guides discourage it because adding or reordering columns in SELECT silently alters grouping logic, causing subtle bugs." }
        ],
        miniAssignment: "Write a query that groups an orders table by customer_id and year, displaying customer_id, year, and sum of total_amount, filtered to totals > 10,000."
      }
    },

    // DAY 17
    {
      day: 17, phase: "SQL", phaseId: 1,
      title: "Relational Intersection: INNER JOIN & Multi-Table Joins",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master relational join fundamentals: Cartesian product, matching logic, and ON predicates.",
        "Implement INNER JOIN to combine rows from two or more tables where matching keys exist in both.",
        "Use concise table aliasing (e.g. `users u JOIN transactions t ON u.user_id = t.user_id`).",
        "Perform multi-table joins connecting Users, Accounts, SIP Mandates, and Transactions."
      ],
      prerequisites: "Days 11-16 SQL foundations, keys, aggregations, and grouping.",
      expectedOutcome: "The ability to write multi-table joins combining customer profiles, bank accounts, and investment ledgers into unified business reports.",
      topics: [
        {
          concept: "Relational Joins & The INNER JOIN Mechanism",
          what: "An INNER JOIN matches records from two tables based on a shared condition (usually Primary Key = Foreign Key), returning only rows that have matches in BOTH tables.",
          why: "In normalized databases, customer names live in `users` and transaction amounts live in `transactions`. INNER JOIN reunites them dynamically.",
          how: "SELECT u.name, t.amount, t.created_at FROM users u INNER JOIN transactions t ON u.user_id = t.user_id;",
          example: "SELECT f.fund_name, m.monthly_amount FROM mutual_funds f JOIN sip_mandates m ON f.fund_id = m.fund_id;",
          businessCase: "Generating a customer statement displaying user name, email, fund name, and deposit amount.",
          pitfalls: "Omitting the ON clause, which causes a catastrophic Cartesian Cross Join (multiplying every row of table A by every row of table B)."
        },
        {
          concept: "Multi-Table Relational Chaining",
          what: "Joining 3 or more tables sequentially by following the foreign key relationships through intermediate bridge tables.",
          why: "A transaction does not link directly to a user; it links to an `account`, which in turn links to a `user`.",
          how: "SELECT u.name, a.bank_name, t.amount FROM users u JOIN accounts a ON u.user_id = a.user_id JOIN transactions t ON a.account_id = t.account_id;",
          example: "Connecting 4 tables: `users` -> `sip_mandates` -> `transactions` -> `mutual_funds`.",
          businessCase: "Reconstructing the end-to-end audit trail: Which investor initiated which SIP into which mutual fund through which bank?",
          pitfalls: "Ambiguous column errors: failing to prefix common column names (like `id` or `created_at`) with their table alias (e.g. `u.created_at` vs `t.created_at`)."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 6 & 7: Multi-Table Queries with Joins", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/select_queries_with_joins", time: "30 mins", covers: "Interactive INNER JOIN practice and ON clauses." },
        { title: "SQL Joins Explained Visually (Venn Diagrams vs Real Tables)", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Inner+Join+Outer+Join+Tutorial", time: "35 mins", covers: "Inner join mechanics, table aliases, and common join pitfalls." },
        { title: "PostgreSQL Table Joins Reference", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-FROM", time: "20 mins", covers: "Official guide on join types and syntax." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 16 GROUP BY and HAVING." },
        { time: "50 mins", activity: "Concept Study: Study INNER JOIN mechanics, ON predicates, and multi-table chaining." },
        { time: "25 mins", activity: "Guided Practice: Replicate 2-table and 3-table join queries." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 relational join challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: End-to-End Investment Audit Trail Report." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 17 assessment questions." }
      ],
      exercises: [
        {
          title: "Join Customer Profiles with Transactions",
          problem: "Write an INNER JOIN connecting `users` and `transactions` to display user name, email, transaction amount, and status.",
          scenario: "Finance team customer payout schedule.",
          instructions: "1. Alias users as `u` and transactions as `t`.\n2. Join on `u.user_id = t.user_id`.\n3. Filter for status = 'SUCCESS'.",
          expectedOutput: "Enriched transaction table with customer identities.",
          hint: "SELECT u.name, u.email, t.amount, t.status FROM users u INNER JOIN transactions t ON u.user_id = t.user_id",
          solution: "SELECT u.name, u.email, t.amount, t.status FROM users u INNER JOIN transactions t ON u.user_id = t.user_id WHERE t.status = 'SUCCESS';"
        },
        {
          title: "Three-Table Chain: Users, Mandates, and Funds",
          problem: "Connect `users`, `sip_mandates`, and `mutual_funds` to display user name, fund name, and monthly SIP amount.",
          scenario: "Customer portfolio overview page.",
          instructions: "1. Join users to sip_mandates on user_id.\n2. Join sip_mandates to mutual_funds on fund_id.\n3. Filter for active mandates.",
          expectedOutput: "List of active investor fund subscriptions.",
          hint: "FROM users u JOIN sip_mandates s ON u.user_id = s.user_id JOIN mutual_funds f ON s.fund_id = f.fund_id",
          solution: "SELECT u.name, f.fund_name, s.monthly_amount, s.start_date FROM users u JOIN sip_mandates s ON u.user_id = s.user_id JOIN mutual_funds f ON s.fund_id = f.fund_id WHERE s.status = 'ACTIVE';"
        },
        {
          title: "Aggregate Across Joins: Total Investment per Customer",
          problem: "Join `users` and `transactions` and calculate total successful investment volume and transaction count per user.",
          scenario: "Investor leaderboard calculation.",
          instructions: "1. Join users and transactions.\n2. Filter status = 'SUCCESS'.\n3. GROUP BY u.user_id, u.name.\n4. ORDER BY total_invested DESC.",
          expectedOutput: "Leaderboard of investors ranked by total accumulated volume.",
          hint: "SELECT u.user_id, u.name, SUM(t.amount) AS total_invested ... GROUP BY u.user_id, u.name",
          solution: "SELECT u.user_id, u.name, SUM(t.amount) AS total_invested, COUNT(t.txn_id) AS txn_count FROM users u JOIN transactions t ON u.user_id = t.user_id WHERE t.status = 'SUCCESS' GROUP BY u.user_id, u.name ORDER BY total_invested DESC;"
        }
      ],
      assignment: {
        title: "FinTech End-to-End Investment Audit Trail Report",
        scenario: "Construct a comprehensive multi-table audit report tracing customer identities, fund allocations, and bank settlement details.",
        deliverable: "Write 4 SQL queries:\n1. 2-Table Join: Display all users who completed KYC along with their registered bank name from `bank_accounts`.\n2. 3-Table Join: Display customer name, mutual fund name, and total amount invested for transactions executed in November 2024.\n3. Aggregate Join: Calculate total AUM managed by each Mutual Fund House (AMC) across all customer transactions.\n4. Diagnostic Join: Find all transactions where customer bank IFSC starts with 'HDFC' but payment gateway was 'Cashfree'.",
        completionCriteria: "Accurately aliased multi-table joins with validated ON clauses and resolved column ambiguities."
      },
      assessment: {
        mcqs: [
          { question: "What happens to rows in an INNER JOIN if a record in Table A has no matching key in Table B?", options: ["Table A row is returned with NULLs for Table B columns.", "The row is completely excluded from the result set.", "The database throws a foreign key error.", "Table B generates a blank row."], correct: 1, explanation: "An INNER JOIN strictly returns the intersection: rows are included only if the join condition evaluates to TRUE in both tables." },
          { question: "What is the primary purpose of assigning table aliases (e.g. `users u`) in join queries?", options: ["To rename the tables in the database.", "To make SQL queries concise and unambiguously specify which table each column belongs to (e.g. u.id vs t.id).", "To speed up query compilation.", "To bypass security permissions."], correct: 1, explanation: "Table aliases provide shorthand prefixes that resolve ambiguous column names and improve readability." },
          { question: "What occurs if you forget the ON clause when joining two tables of 1,000 rows each (e.g. SELECT * FROM table1 JOIN table2;)?", options: ["The query fails immediately.", "A Cartesian product is produced, returning 1,000 x 1,000 = 1,000,000 rows.", "Only the first row is returned.", "The second table is ignored."], correct: 1, explanation: "Omitting the ON clause produces a Cartesian Cross Join, pairing every row of the first table with every row of the second table." },
          { question: "In a 3-table join (`users` -> `mandates` -> `transactions`), how many JOIN clauses are required?", options: ["One", "Two", "Three", "Four"], correct: 1, explanation: "Joining N tables requires at least N - 1 JOIN clauses. For 3 tables, you need 2 JOIN statements." },
          { question: "What does the error 'column reference \"created_at\" is ambiguous' mean?", options: ["The column is spelled incorrectly.", "Both tables in the join contain a column named `created_at`, and SQL doesn't know which one you want.", "The column contains NULLs.", "The date format is invalid."], correct: 1, explanation: "When two tables share a common column name, you must qualify it with the table alias (e.g. u.created_at or t.created_at)." }
        ],
        scenarios: [
          { question: "A query joined `users` and `transactions` using an INNER JOIN, but the total user count dropped from 10,000 to 3,200. Why?", solution: "An INNER JOIN only returns users who have at least one matching transaction. The 6,800 users who signed up but never made an investment were excluded. To keep all users, you must use a LEFT JOIN." },
          { question: "Why is joining on non-indexed text columns (e.g. ON u.email = t.user_email) significantly slower than joining on integer Primary Keys (ON u.user_id = t.user_id)?", solution: "Integer comparisons require a single CPU instruction, and Primary Keys have B-Tree indexes. Comparing long string characters across thousands of rows requires variable-length string comparisons and heavy memory lookups." },
          { question: "Can you join a table to itself in SQL? What is this called and give a practical business use case.", solution: "Yes, this is a SELF JOIN. A common use case is hierarchical data (e.g. employees table where manager_id references employee_id in the same table) or comparing consecutive transactions from the same user." }
        ],
        miniAssignment: "Write an INNER JOIN query connecting customers and orders on customer_id, selecting customer name, order_id, order_date, and total_amount."
      }
    },

    // DAY 18
    {
      day: 18, phase: "SQL", phaseId: 1,
      title: "Preserving Incomplete Records: LEFT JOIN & Unmatched Audits",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master LEFT (OUTER) JOIN semantics: preserve all rows from the left table while matching from the right.",
        "Understand NULL generation for unmatched right-side attributes.",
        "Perform critical 'Unmatched Records' audits using `WHERE right_table.key IS NULL`.",
        "Identify newly onboarded investors who have zero active SIPs or zero transaction activity."
      ],
      prerequisites: "Day 17 INNER JOIN fundamentals.",
      expectedOutcome: "The ability to audit customer acquisition funnels, finding registered users who never transacted, and finding active mandates with zero successful payments.",
      topics: [
        {
          concept: "LEFT JOIN Semantics & NULL Generation",
          what: "A LEFT JOIN returns ALL records from the left table, and the matched records from the right table. If no match exists, the right-side columns return NULL.",
          why: "In business analysis, you frequently need to analyze inactive or non-participating entities: 'Show me all customers, and their transactions if they have any'.",
          how: "SELECT u.user_id, u.name, t.txn_id, t.amount FROM users u LEFT JOIN transactions t ON u.user_id = t.user_id;",
          example: "If user 'Pooja' has zero transactions, u.name returns 'Pooja' and t.amount returns NULL.",
          businessCase: "Calculating customer activation rate: dividing users who have a non-null transaction by total registered users in the left table.",
          pitfalls: "Placing a right-table condition in the WHERE clause (e.g. `WHERE t.status = 'SUCCESS'`), which accidentally converts the LEFT JOIN back into an INNER JOIN."
        },
        {
          concept: "The Anti-Join Pattern: Finding Unmatched Records",
          what: "Using `LEFT JOIN ... WHERE right_table.primary_key IS NULL` to isolate records that exist in Table A but have NO corresponding record in Table B.",
          why: "Marketing and Operations teams spend significant budget re-engaging inactive or stuck customers.",
          how: "SELECT u.user_id, u.name, u.email FROM users u LEFT JOIN transactions t ON u.user_id = t.user_id WHERE t.txn_id IS NULL;",
          example: "SELECT f.fund_name FROM mutual_funds f LEFT JOIN sip_mandates m ON f.fund_id = m.fund_id WHERE m.mandate_id IS NULL;",
          businessCase: "Identifying mutual fund schemes in the catalog that have zero customer investments.",
          pitfalls: "Testing `WHERE right_table.column IS NULL` on a column that naturally allows NULLs, rather than on the right table's Primary Key."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 8: A Note on NULLs and Outer Joins", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/select_queries_with_outer_joins", time: "25 mins", covers: "LEFT JOIN, RIGHT JOIN, and unmatched record filtering." },
        { title: "LEFT JOIN vs INNER JOIN Explained Simply", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Left+Join+Tutorial", time: "30 mins", covers: "Visual breakdown of preserving left table rows and anti-joins." },
        { title: "PostgreSQL Outer Joins Guide", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/tutorial-join.html", time: "20 mins", covers: "Official guide on outer joins." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 17 INNER JOIN and multi-table chaining." },
        { time: "50 mins", activity: "Concept Study: Study LEFT JOIN mechanics, NULL generation, and anti-join patterns." },
        { time: "25 mins", activity: "Guided Practice: Replicate inactive customer identification queries." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 LEFT JOIN challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Customer Drop-off & Dormant Mandate Audit Suite." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 18 assessment questions." }
      ],
      exercises: [
        {
          title: "Find All Registered Users with Zero Transactions",
          problem: "Query `users` and `transactions` to return users who have never placed a single transaction.",
          scenario: "Activation marketing team needs email list for re-engagement promo.",
          instructions: "1. LEFT JOIN users to transactions.\n2. Filter WHERE transactions.txn_id IS NULL.\n3. Return user_id, name, email.",
          expectedOutput: "List of inactive customer accounts.",
          hint: "LEFT JOIN transactions t ON u.user_id = t.user_id WHERE t.txn_id IS NULL",
          solution: "SELECT u.user_id, u.name, u.email, u.created_at FROM users u LEFT JOIN transactions t ON u.user_id = t.user_id WHERE t.txn_id IS NULL;"
        },
        {
          title: "Count Mandates per User Including Zero-Mandate Users",
          problem: "List all users and the total count of SIP mandates they own. Users with zero mandates must show 0, not 1 or missing.",
          scenario: "User engagement segmentation report.",
          instructions: "1. LEFT JOIN users to sip_mandates.\n2. Use COUNT(m.mandate_id) instead of COUNT(*).\n3. GROUP BY u.user_id, u.name.",
          expectedOutput: "Every user with their mandate count (including 0).",
          hint: "COUNT(m.mandate_id) counts non-null mandate IDs.",
          solution: "SELECT u.user_id, u.name, COUNT(m.mandate_id) AS total_mandates FROM users u LEFT JOIN sip_mandates m ON u.user_id = m.user_id GROUP BY u.user_id, u.name ORDER BY total_mandates ASC;"
        },
        {
          title: "Catalog Audit: Mutual Funds with Zero Active Inflows",
          problem: "Identify mutual fund schemes from `mutual_funds` that currently have no active investments.",
          scenario: "Catalog optimization removing zero-interest schemes.",
          instructions: "1. LEFT JOIN mutual_funds to transactions.\n2. Filter WHERE txn_id IS NULL.\n3. Return fund_id, fund_name, category.",
          expectedOutput: "Unsubscribed mutual fund products.",
          hint: "WHERE t.txn_id IS NULL",
          solution: "SELECT f.fund_id, f.fund_name, f.category FROM mutual_funds f LEFT JOIN transactions t ON f.fund_id = t.fund_id WHERE t.txn_id IS NULL;"
        }
      ],
      assignment: {
        title: "FinTech Customer Activation Funnel & Dormant Mandate Audit",
        scenario: "Audit user drop-off across the onboarding journey to identify operational bottlenecks.",
        deliverable: "Write 4 SQL queries:\n1. Find all users who completed KYC but never added a bank account.\n2. Find all bank accounts that have never been used in any transaction.\n3. Find all active SIP mandates that have had zero successful debits in the last 60 days.\n4. Calculate the overall platform conversion percentage: (Users with >= 1 transaction / Total registered users) * 100.",
        completionCriteria: "Accurate queries utilizing LEFT JOIN, anti-join NULL filters, and appropriate COUNT(column) aggregations."
      },
      assessment: {
        mcqs: [
          { question: "What will a LEFT JOIN return if a row in the left table has no matching row in the right table?", options: ["It discards the row.", "It keeps the row and fills all columns from the right table with NULL.", "It generates a syntax error.", "It duplicates the left table row."], correct: 1, explanation: "A LEFT JOIN guarantees every row from the left table is returned, populating missing right-side values with NULL." },
          { question: "How do you find rows in Table A that do NOT exist in Table B using a join?", options: ["INNER JOIN with WHERE B.id IS NOT NULL", "LEFT JOIN with WHERE B.id IS NULL (where B.id is Table B's Primary Key)", "FULL JOIN with WHERE A.id = B.id", "CROSS JOIN"], correct: 1, explanation: "The anti-join pattern performs a LEFT JOIN and filters for where the right table's Primary Key is NULL." },
          { question: "Why does putting `WHERE right_table.status = 'ACTIVE'` turn a LEFT JOIN into an INNER JOIN?", options: ["It is an SQL compiler bug.", "Because unmatched left rows have NULL for right_table.status, and NULL = 'ACTIVE' evaluates to UNKNOWN, discarding those rows.", "SQL requires joins in uppercase.", "It does not; it remains a LEFT JOIN."], correct: 1, explanation: "Filtering a right-table column in the WHERE clause discards the NULLs created by the LEFT JOIN, converting it to an INNER JOIN. To preserve them, move the condition into the ON clause." },
          { question: "What is the difference between COUNT(*) and COUNT(right_table.id) in a LEFT JOIN query?", options: ["They return the exact same value.", "COUNT(*) counts all rows including unmatched rows (counting them as 1); COUNT(right_table.id) counts only matched rows (ignoring NULLs as 0).", "COUNT(right_table.id) is invalid.", "COUNT(*) only counts numbers."], correct: 1, explanation: "COUNT(*) counts the generated rows even if right-side values are NULL. COUNT(right_table.id) correctly tallies 0 for unmatched records." },
          { question: "How does RIGHT JOIN relate to LEFT JOIN?", options: ["RIGHT JOIN is completely different.", "TableA RIGHT JOIN TableB is logically identical to TableB LEFT JOIN TableA.", "RIGHT JOIN cannot handle NULLs.", "RIGHT JOIN only works on MySQL."], correct: 1, explanation: "A RIGHT JOIN simply reverses the table hierarchy. Most industry teams standardize on LEFT JOIN for left-to-right code readability." }
        ],
        scenarios: [
          { question: "Why is writing `LEFT JOIN TableB ON TableA.id = TableB.id AND TableB.status = 'ACTIVE'` different from writing `LEFT JOIN TableB ON TableA.id = TableB.id WHERE TableB.status = 'ACTIVE'`?", solution: "Putting the condition in the ON clause filters which rows from TableB get joined, while still keeping all rows from TableA. Putting it in the WHERE clause filters the entire final result set after joining, discarding any TableA rows that had no match." },
          { question: "A query meant to find customers without bank accounts used: WHERE bank_name IS NULL. Why could this fail if bank_name allows NULL values in the accounts table?", solution: "If a customer has an account record where bank_name is accidentally left blank, the query treats them as having no account. Always filter on the table's Primary Key (WHERE account_id IS NULL) because a Primary Key is guaranteed to never be NULL if the record exists." },
          { question: "How does a LEFT JOIN help evaluate the effectiveness of marketing referral codes?", solution: "SELECT u.referral_code, COUNT(u.user_id) AS signups, COUNT(t.txn_id) AS transacting_users FROM users u LEFT JOIN transactions t ON u.user_id = t.user_id GROUP BY u.referral_code; This compares total signups to transacting customers per channel." }
        ],
        miniAssignment: "Write a query that lists all products from a products table and the count of orders for each from an order_items table, including products with 0 orders."
      }
    },

    // DAY 19
    {
      day: 19, phase: "SQL", phaseId: 1,
      title: "Advanced Relational Joins: FULL OUTER JOIN, CROSS JOIN & SELF JOIN",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master FULL (OUTER) JOIN for bidirectional reconciliation between internal databases and external payment logs.",
        "Understand CROSS JOIN (Cartesian product) and its practical use in generating complete matrix grids.",
        "Implement SELF JOIN to analyze hierarchical data and compare sequential transactions from the same customer.",
        "Reconcile daily transaction settlement ledgers between platform databases and bank gateway statements."
      ],
      prerequisites: "Days 17-18 INNER and LEFT joins.",
      expectedOutcome: "The ability to perform two-way financial ledger audits, generate multi-dimensional matrix frameworks, and compare consecutive user events.",
      topics: [
        {
          concept: "FULL OUTER JOIN for Bidirectional Reconciliation",
          what: "A FULL OUTER JOIN returns all rows when there is a match in EITHER left or right table, filling missing sides with NULLs.",
          why: "In payment reconciliation, bank statements may contain settlements missing from your app database, and your app may have transactions missing from the bank. A FULL OUTER JOIN highlights both discrepancies.",
          how: "SELECT app.txn_id, app.amount, bank.bank_ref, bank.amount FROM app_transactions app FULL OUTER JOIN bank_settlements bank ON app.txn_id = bank.txn_id WHERE app.txn_id IS NULL OR bank.bank_ref IS NULL;",
          example: "Isolating transactions where money was deducted from customer but failed to credit in merchant account.",
          businessCase: "Daily financial reconciliation between Razorpay settlement reports and core banking ledger.",
          pitfalls: "Assuming an INNER JOIN or LEFT JOIN can identify discrepancies on both sides simultaneously."
        },
        {
          concept: "SELF JOIN for Sequential Comparisons & Hierarchy",
          what: "Joining a table to itself using distinct aliases (e.g. `transactions t1 JOIN transactions t2`).",
          why: "Comparing a user's transaction with their subsequent transaction to calculate time elapsed between deposits or identify rapid duplicate charges.",
          how: "SELECT t1.user_id, t1.txn_id AS txn1, t2.txn_id AS txn2, t1.amount FROM transactions t1 JOIN transactions t2 ON t1.user_id = t2.user_id AND t1.txn_id != t2.txn_id AND t2.created_at BETWEEN t1.created_at AND t1.created_at + INTERVAL '5 minutes';",
          example: "Detecting accidental double-clicks where a customer was charged twice within 3 minutes.",
          businessCase: "Fraud detection rule flagging rapid-fire card debits.",
          pitfalls: "Forgetting to add an inequality condition (like `t1.id < t2.id`), which causes every row to match with itself and duplicates pair comparisons."
        }
      ],
      resources: [
        { title: "FULL OUTER JOIN & CROSS JOIN in PostgreSQL", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/queries-table-expressions.html", time: "20 mins", covers: "Syntax and behavior of full outer and cross joins." },
        { title: "SQL Self Join Tutorial with Practical Examples", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Self+Join+Tutorial", time: "25 mins", covers: "Hierarchical data and consecutive record comparisons." },
        { title: "Cartesian Products & CROSS JOIN Best Practices", platform: "W3Schools", url: "https://www.w3schools.com/sql/sql_join.asp", time: "20 mins", covers: "Join comparison matrix." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 18 LEFT JOIN and anti-join patterns." },
        { time: "50 mins", activity: "Concept Study: Study FULL OUTER JOIN, CROSS JOIN, and SELF JOIN use cases." },
        { time: "25 mins", activity: "Guided Practice: Replicate reconciliation audits and duplicate charge detection." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 advanced join challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Two-Way Banking Reconciliation Model." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 19 assessment questions." }
      ],
      exercises: [
        {
          title: "Two-Way Payment Ledger Reconciliation",
          problem: "Compare internal `app_transactions` with external `bank_settlements`. Find records missing on either side.",
          scenario: "Daily treasury reconciliation audit.",
          instructions: "1. Use FULL OUTER JOIN on transaction_id.\n2. Filter WHERE app.txn_id IS NULL OR bank.txn_id IS NULL.\n3. Return identifiers and amounts from both tables.",
          expectedOutput: "Discrepancy list showing orphaned records on both systems.",
          hint: "FULL OUTER JOIN bank_settlements b ON a.txn_id = b.txn_id WHERE a.txn_id IS NULL OR b.txn_id IS NULL",
          solution: "SELECT a.txn_id AS internal_id, a.amount AS internal_amt, b.txn_id AS bank_id, b.amount AS bank_amt FROM app_transactions a FULL OUTER JOIN bank_settlements b ON a.txn_id = b.txn_id WHERE a.txn_id IS NULL OR b.txn_id IS NULL;"
        },
        {
          title: "Detect Rapid Duplicate Transactions with SELF JOIN",
          problem: "Identify instances where the same user executed two transactions for the exact same amount within 10 minutes of each other.",
          scenario: "Payment gateway accidental double-billing fraud detection.",
          instructions: "1. SELF JOIN transactions t1 and t2 on user_id and amount.\n2. Ensure t1.txn_id < t2.txn_id.\n3. Add time difference condition <= 10 minutes.",
          expectedOutput: "Flagged duplicate transaction pairs.",
          hint: "ON t1.user_id = t2.user_id AND t1.amount = t2.amount AND t1.txn_id < t2.txn_id",
          solution: "SELECT t1.user_id, t1.txn_id AS first_txn, t2.txn_id AS second_txn, t1.amount, t1.created_at, t2.created_at FROM transactions t1 JOIN transactions t2 ON t1.user_id = t2.user_id AND t1.amount = t2.amount AND t1.txn_id < t2.txn_id WHERE t2.created_at BETWEEN t1.created_at AND t1.created_at + INTERVAL '10 minutes';"
        },
        {
          title: "Generate Month-Category Master Matrix with CROSS JOIN",
          problem: "Generate a master grid containing every combination of 12 calendar months and 5 mutual fund categories.",
          scenario: "Ensuring reports show 0 volume for inactive categories rather than omitting rows.",
          instructions: "1. CROSS JOIN `dim_months` with `dim_categories`.\n2. Observe Cartesian combination (12 x 5 = 60 rows).",
          expectedOutput: "Complete 60-row reporting scaffold.",
          hint: "SELECT m.month_name, c.category_name FROM dim_months m CROSS JOIN dim_categories c",
          solution: "SELECT m.month_name, c.category_name FROM dim_months m CROSS JOIN dim_categories c ORDER BY m.month_number, c.category_name;"
        }
      ],
      assignment: {
        title: "Two-Way FinTech Banking Ledger Reconciliation Suite",
        scenario: "Audit 5,000 internal ledger rows against 5,020 bank settlement statement rows for October 2024.",
        deliverable: "Write 4 SQL queries:\n1. FULL OUTER JOIN identifying transactions recorded in app but missing in bank statement (Customer charged, merchant unpaid).\n2. Discrepancies where bank statement has settlement but app has no record (Uncaptured bank credits).\n3. Value variance query: transactions where both sides match on ID, but transaction amounts differ.\n4. SELF JOIN: Identify users whose second transaction was at least 3x larger than their first transaction.",
        completionCriteria: "Accurate queries demonstrating mastery of FULL OUTER JOIN, SELF JOIN, and NULL exception filters."
      },
      assessment: {
        mcqs: [
          { question: "When should you use a FULL OUTER JOIN instead of a LEFT JOIN?", options: ["When you only want matching rows.", "When you need to see unmatched rows from BOTH tables simultaneously (e.g. two-way financial audits).", "When working with MySQL only.", "When tables have no Primary Keys."], correct: 1, explanation: "A FULL OUTER JOIN preserves all records from both tables, filling missing fields on either side with NULLs." },
          { question: "What is a CROSS JOIN?", options: ["A join across two different database servers.", "A Cartesian product combining every row of the first table with every row of the second table.", "An encrypted join.", "A join on multiple columns."], correct: 1, explanation: "A CROSS JOIN produces a Cartesian product, multiplying the row count of table A by the row count of table B." },
          { question: "Why is the condition `t1.id < t2.id` commonly used in a SELF JOIN comparing transactions?", options: ["To sort the results.", "To prevent a row from matching with itself and prevent duplicate reciprocal pairs (A matches B, B matches A).", "It is required by SQL syntax.", "To limit results to 10 rows."], correct: 1, explanation: "Using `<` ensures each distinct pair is compared only once and prevents self-matching (where an ID equals itself)." },
          { question: "If Table A has 5 rows and Table B has 10 rows, how many rows will a CROSS JOIN return?", options: ["15", "5", "10", "50"], correct: 3, explanation: "A Cartesian product multiplies row counts: 5 x 10 = 50 rows." },
          { question: "Can a FULL OUTER JOIN be simulated in database engines that lack native FULL JOIN support (like older MySQL)?", options: ["No, it is impossible.", "Yes, by performing a LEFT JOIN and a RIGHT JOIN combined with UNION.", "Only using Excel.", "Only using Python."], correct: 1, explanation: "A FULL OUTER JOIN is mathematically equivalent to (TableA LEFT JOIN TableB) UNION (TableA RIGHT JOIN TableB)." }
        ],
        scenarios: [
          { question: "How does an operational finance team use a FULL OUTER JOIN to calculate 'Net Settlement Variance'?", solution: "SELECT COALESCE(a.txn_id, b.txn_id) AS id, COALESCE(a.amount, 0) - COALESCE(b.amount, 0) AS variance FROM app_ledger a FULL JOIN bank_ledger b ON a.txn_id = b.txn_id WHERE a.amount != b.amount OR a.txn_id IS NULL OR b.txn_id IS NULL;" },
          { question: "Why would a business analyst deliberately use a CROSS JOIN to build a reporting template?", solution: "If you want a dashboard to display every product in every region (even if sales were zero in that region), you CROSS JOIN Products and Regions to create a 100% complete grid, then LEFT JOIN actual sales, using COALESCE(sales, 0)." },
          { question: "In an employee hierarchy table with `employee_id` and `manager_id`, write a SELF JOIN to display employee name and their manager's name.", solution: "SELECT e.name AS employee_name, m.name AS manager_name FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id; (Use LEFT JOIN so the CEO who has no manager is not excluded)." }
        ],
        miniAssignment: "Write a query performing a FULL OUTER JOIN between two tables (table_a and table_b) on id, filtering to rows where either table's id is NULL."
      }
    },

    // DAY 20
    {
      day: 20, phase: "SQL", phaseId: 1,
      title: "Conditional Logic & Categorical Binning: CASE WHEN",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master CASE WHEN expressions: Simple CASE vs Searched CASE.",
        "Implement categorical binning: segmenting continuous numeric amounts into business brackets (Micro, Retail, HNW).",
        "Perform conditional aggregation (pivoting rows into columns using SUM(CASE WHEN ...)).",
        "Normalize inconsistent legacy status codes into unified reporting categories."
      ],
      prerequisites: "Days 15-16 aggregations and Day 13 boolean logic.",
      expectedOutcome: "The ability to categorize financial risk, build custom pivot metrics in SQL, and transform raw rows into executive KPI tables using CASE statements.",
      topics: [
        {
          concept: "Searched CASE WHEN & Data Binning",
          what: "CASE WHEN evaluates boolean conditions sequentially, returning the value for the first true condition, with an optional ELSE fallback.",
          why: "Databases store continuous numbers (e.g. ₹1,200, ₹45,000). Leadership needs categorical segments: 'Micro-SIP', 'Retail', 'Wealth'.",
          how: "SELECT amount, CASE WHEN amount >= 500000 THEN 'HNW' WHEN amount >= 50000 THEN 'Affluent' WHEN amount >= 5000 THEN 'Retail' ELSE 'Micro' END AS investor_tier FROM transactions;",
          example: "Evaluating KYC: CASE WHEN pan IS NOT NULL AND aadhar IS NOT NULL THEN 'Full KYC' ELSE 'Partial' END.",
          businessCase: "Dynamic investor segmentation for personalized marketing automation.",
          pitfalls: "Placing broader conditions before narrower conditions (e.g. checking `amount >= 5000` before `amount >= 500000`), which causes HNW records to be misclassified as Retail."
        },
        {
          concept: "Conditional Aggregation (Pivot Tables in Pure SQL)",
          what: "Wrapping CASE statements inside aggregate functions: SUM(CASE WHEN status = 'SUCCESS' THEN amount ELSE 0 END).",
          why: "Standard GROUP BY outputs statuses as rows. Executive dashboards require 'Success Volume' and 'Failed Volume' side-by-side as separate columns.",
          how: "SELECT gateway, SUM(CASE WHEN status = 'SUCCESS' THEN amount ELSE 0 END) AS success_vol, SUM(CASE WHEN status = 'FAILED' THEN amount ELSE 0 END) AS failed_vol FROM transactions GROUP BY gateway;",
          example: "Counting users by tier: COUNT(CASE WHEN tier = 'Gold' THEN 1 END) AS gold_users.",
          businessCase: "Building daily gateway performance scorecards with success and failure metrics in a single row per vendor.",
          pitfalls: "Using `ELSE 1` or omitting `ELSE 0` inside SUM(CASE...), which inflates numeric calculations."
        }
      ],
      resources: [
        { title: "SQL CASE Statement Tutorial with Real Scenarios", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Case+Statement+Tutorial", time: "25 mins", covers: "Syntax, searched CASE, and business binning." },
        { title: "Conditional Aggregation in SQL (Pivot Without PIVOT)", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+SQL+Conditional+Aggregation+CASE+WHEN", time: "30 mins", covers: "SUM(CASE...) and COUNT(CASE...) patterns." },
        { title: "PostgreSQL Conditional Expressions Documentation", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/functions-conditional.html", time: "20 mins", covers: "Official guide on CASE, COALESCE, and NULLIF." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 19 advanced joins and reconciliation audits." },
        { time: "50 mins", activity: "Concept Study: Study Searched CASE, conditional aggregation, and column pivoting." },
        { time: "25 mins", activity: "Guided Practice: Build investor segmentation and gateway pivoting queries." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 CASE WHEN challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Executive Payment Performance & Risk Scorecard." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 20 assessment questions." }
      ],
      exercises: [
        {
          title: "Categorize Investors by Ticket Size Bins",
          problem: "From `transactions`, categorize investments: >= ₹100,000 as 'Institutional', >= ₹10,000 as 'Wealth', >= ₹1,000 as 'Retail', and < ₹1,000 as 'Micro'.",
          scenario: "Distribution channel performance analysis.",
          instructions: "1. Write Searched CASE statement.\n2. Ensure descending order of conditions.\n3. Alias as `investment_bracket`.",
          expectedOutput: "Transactions classified into 4 standardized tiers.",
          hint: "CASE WHEN amount >= 100000 THEN 'Institutional' ... ELSE 'Micro' END",
          solution: "SELECT txn_id, user_id, amount, CASE WHEN amount >= 100000 THEN 'Institutional' WHEN amount >= 10000 THEN 'Wealth' WHEN amount >= 1000 THEN 'Retail' ELSE 'Micro' END AS investment_bracket FROM transactions;"
        },
        {
          title: "Pivot Gateway Success and Failure Volumes into Columns",
          problem: "For each payment gateway, display total volume, successful volume, failed volume, and success rate percentage in a single row.",
          scenario: "Executive operational scorecard.",
          instructions: "1. Use SUM(CASE WHEN status = 'SUCCESS' THEN amount ELSE 0 END).\n2. Use SUM(CASE WHEN status = 'FAILED' THEN amount ELSE 0 END).\n3. Compute success rate %.\n4. GROUP BY payment_gateway.",
          expectedOutput: "Clean horizontal comparison of vendor gateway performance.",
          hint: "SUM(CASE WHEN status = 'SUCCESS' THEN amount ELSE 0 END) AS success_volume",
          solution: "SELECT payment_gateway, SUM(amount) AS total_volume, SUM(CASE WHEN status = 'SUCCESS' THEN amount ELSE 0 END) AS success_vol, SUM(CASE WHEN status = 'FAILED' THEN amount ELSE 0 END) AS failed_vol, ROUND(100.0 * SUM(CASE WHEN status = 'SUCCESS' THEN amount ELSE 0 END) / NULLIF(SUM(amount), 0), 2) AS success_rate_pct FROM transactions GROUP BY payment_gateway;"
        },
        {
          title: "Standardize Inconsistent Legacy Status Codes",
          problem: "Consolidate messy status codes: ('PAID', 'CAPTURED', 'SUCCESS') -> 'COMPLETED'; ('DECLINED', 'BOUNCED', 'REJECTED') -> 'FAILED'; others -> 'PENDING'.",
          scenario: "Normalizing multi-gateway webhook responses.",
          instructions: "1. Use CASE WHEN status IN (...).\n2. Count transactions in each consolidated status.",
          expectedOutput: "Three unified status buckets.",
          hint: "CASE WHEN status IN ('PAID', 'CAPTURED', 'SUCCESS') THEN 'COMPLETED' ...",
          solution: "SELECT CASE WHEN status IN ('PAID', 'CAPTURED', 'SUCCESS') THEN 'COMPLETED' WHEN status IN ('DECLINED', 'BOUNCED', 'REJECTED') THEN 'FAILED' ELSE 'PENDING' END AS unified_status, COUNT(*) AS txn_count FROM transactions GROUP BY 1;"
        }
      ],
      assignment: {
        title: "Executive FinTech Payment Gateway Performance & Risk Matrix",
        scenario: "Build an executive reporting query summarizing operational volume, failure categories, and risk tiers across all partners.",
        deliverable: "Write 4 SQL queries:\n1. Classify active users into risk categories based on average SIP commitment and KYC completeness.\n2. Single-query pivot: Gateway name, total transactions, count of successful, count of failed, count of cancelled.\n3. Calculate net platform fee earned: 1.5% for NetBanking, 1.8% for Cards, 0% for UPI (using CASE in arithmetic).\n4. Summarize total investment volume binned by day of the week ('Weekend' vs 'Weekday').",
        completionCriteria: "Accurate queries demonstrating mastery of Searched CASE, conditional aggregation, and division-by-zero protection."
      },
      assessment: {
        mcqs: [
          { question: "Why does the order of conditions matter in a Searched CASE statement?", options: ["It does not matter.", "SQL evaluates conditions from top to bottom and exits immediately on the first condition that evaluates to TRUE.", "SQL sorts conditions alphabetically.", "SQL evaluates all conditions simultaneously."], correct: 1, explanation: "CASE evaluates top-to-bottom. If a generic condition appears before a specific condition, the specific condition will never be reached." },
          { question: "What happens if no condition in a CASE statement evaluates to TRUE and there is no ELSE clause?", options: ["SQL returns an error.", "SQL returns NULL.", "SQL returns 0.", "SQL repeats the last value."], correct: 1, explanation: "If no WHEN condition matches and no ELSE is specified, CASE returns NULL." },
          { question: "How do you count how many orders had a status of 'FAILED' in a single grouped query?", options: ["COUNT(status = 'FAILED')", "COUNT(CASE WHEN status = 'FAILED' THEN 1 END)", "SUM(status = 'FAILED')", "TOTAL(status)"], correct: 1, explanation: "COUNT(CASE WHEN status = 'FAILED' THEN 1 END) returns 1 for failed rows and NULL for others; COUNT ignores the NULLs, yielding the exact count." },
          { question: "What is the purpose of NULLIF(denominator, 0) in financial ratio queries?", options: ["To round to zero decimals.", "To convert a zero denominator to NULL, preventing fatal #DIV/0! errors.", "To format numbers as currency.", "To delete zero rows."], correct: 1, explanation: "NULLIF(x, 0) returns NULL if x is 0. Dividing by NULL safely results in NULL instead of a database crash." },
          { question: "Which keyword must terminate every CASE expression in SQL?", options: ["STOP", "CLOSE", "END", "EXIT"], correct: 2, explanation: "Every CASE statement must end with the END keyword (e.g. CASE ... END)." }
        ],
        scenarios: [
          { question: "A developer wrote: `CASE WHEN amount > 1000 THEN 'Silver' WHEN amount > 100000 THEN 'Diamond' END`. What bug does this create for an amount of ₹500,000?", solution: "Because ₹500,000 is greater than 1,000, the first condition immediately evaluates to TRUE, tagging the customer as 'Silver'. 'Diamond' is never reached. Always order numeric thresholds from largest to smallest." },
          { question: "How do you write a query that calculates the percentage of total volume generated by UPI in a single SELECT line?", solution: "SELECT ROUND(100.0 * SUM(CASE WHEN mode = 'UPI' THEN amount ELSE 0 END) / SUM(amount), 2) AS upi_share_pct FROM transactions;" },
          { question: "Can a CASE statement be used inside an ORDER BY clause? Give an example.", solution: "Yes! You can specify custom sort orders: ORDER BY CASE WHEN status = 'CRITICAL' THEN 1 WHEN status = 'HIGH' THEN 2 WHEN status = 'MEDIUM' THEN 3 ELSE 4 END ASC. This sorts by business urgency rather than alphabetically." }
        ],
        miniAssignment: "Write a query selecting employee_id, salary, and a salary_grade column ('High' if > 80k, 'Medium' if > 50k, else 'Standard')."
      }
    },

    // DAY 21 (Weekly Assessment 3)
    {
      day: 21, phase: "SQL", phaseId: 1,
      title: "Nested Inquiries: Scalar & Correlated Subqueries [Weekly Assessment 3]",
      difficulty: "Intermediate-Advanced", duration: 180,
      objectives: [
        "Master the three subquery types: Scalar (single value), Column (list of values), and Table (inline derived table).",
        "Implement subqueries in WHERE clauses with comparison operators, IN, NOT IN, and EXISTS.",
        "Understand Correlated Subqueries: row-by-row outer query evaluation.",
        "Compare user investment behavior against platform benchmarks (e.g. above-average transactions).",
        "Synthesize Weeks 1–3 competencies in the comprehensive Weekly Assessment 3."
      ],
      prerequisites: "Days 11-20 SQL joins, aggregations, and CASE statements.",
      expectedOutcome: "The ability to write complex nested inquiries comparing individual performance against global averages and auditing multi-table dependencies.",
      topics: [
        {
          concept: "Scalar & Column Subqueries",
          what: "A subquery is a query nested inside another query. A Scalar subquery returns exactly one row and one column. A Column subquery returns a single column list.",
          why: "To find transactions larger than the platform average, you cannot hardcode the average amount; a subquery dynamically calculates the average in real time.",
          how: "SELECT * FROM transactions WHERE amount > (SELECT AVG(amount) FROM transactions WHERE status = 'SUCCESS');",
          example: "SELECT * FROM users WHERE user_id IN (SELECT DISTINCT user_id FROM sip_mandates WHERE status = 'ACTIVE');",
          businessCase: "Isolating high-impact customer transactions that exceed the 90th percentile of platform volume.",
          pitfalls: "Using an equality operator (=) with a subquery that accidentally returns multiple rows, causing a 'more than one row returned by a subquery' runtime error."
        },
        {
          concept: "Correlated Subqueries & EXISTS vs IN",
          what: "A correlated subquery references columns from the outer query, executing once for every row processed by the outer query. EXISTS tests for row existence.",
          why: "EXISTS stops searching as soon as it finds a single match, making it dramatically faster than IN on large tables with millions of records.",
          how: "SELECT u.user_id, u.name FROM users u WHERE EXISTS (SELECT 1 FROM transactions t WHERE t.user_id = u.user_id AND t.amount >= 100000);",
          example: "Finding customers who have had at least one failed transaction: WHERE EXISTS (SELECT 1 FROM transactions t WHERE t.user_id = u.user_id AND t.status = 'FAILED').",
          businessCase: "Targeting re-engagement incentives to customers who experienced payment failures.",
          pitfalls: "Writing slow correlated subqueries on unindexed foreign keys, causing quadratic O(N*M) query execution times."
        }
      ],
      resources: [
        { title: "SQLBolt Lesson 12: Subqueries", platform: "SQLBolt", url: "https://sqlbolt.com/lesson/subqueries", time: "25 mins", covers: "Scalar subqueries, IN, and subqueries in FROM clauses." },
        { title: "SQL Subqueries Masterclass (Scalar vs Correlated)", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Subqueries+Tutorial", time: "35 mins", covers: "Subqueries in SELECT, FROM, and WHERE clauses." },
        { title: "PostgreSQL Subquery Expressions (EXISTS, IN, ANY, ALL)", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/functions-subquery.html", time: "20 mins", covers: "Official documentation on subquery operators." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 20 CASE WHEN and conditional aggregation." },
        { time: "50 mins", activity: "Concept Study: Study Scalar subqueries, derived tables, and EXISTS vs IN." },
        { time: "25 mins", activity: "Guided Practice: Replicate benchmark comparison and existence auditing." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 subquery challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Complete Weekly Assessment 3 Query Suite." },
        { time: "20 mins", activity: "Quiz & Review: Complete Weekly Assessment 3 assessment questions." }
      ],
      exercises: [
        {
          title: "Find Above-Average Transactions Using Scalar Subquery",
          problem: "Select transaction_id, user_id, amount, and the overall platform average amount for transactions that exceed the platform average.",
          scenario: "Identifying high-volume transactions for treasury liquidity planning.",
          instructions: "1. Write a scalar subquery in the WHERE clause: amount > (SELECT AVG(amount)...).\n2. Include the scalar subquery in the SELECT list as `benchmark_avg`.",
          expectedOutput: "Transactions larger than the global mean with the reference benchmark displayed.",
          hint: "WHERE amount > (SELECT AVG(amount) FROM transactions WHERE status = 'SUCCESS')",
          solution: "SELECT txn_id, user_id, amount, ROUND((SELECT AVG(amount) FROM transactions WHERE status = 'SUCCESS'), 2) AS platform_avg FROM transactions WHERE amount > (SELECT AVG(amount) FROM transactions WHERE status = 'SUCCESS') AND status = 'SUCCESS' ORDER BY amount DESC;"
        },
        {
          title: "Identify Active Mandate Owners with EXISTS",
          problem: "Select user_id, name, and email for all users who have at least one ACTIVE SIP mandate, using EXISTS.",
          scenario: "Auditing active recurring revenue investors.",
          instructions: "1. Write outer query on `users u`.\n2. In WHERE, write EXISTS (SELECT 1 FROM sip_mandates s WHERE s.user_id = u.user_id AND s.status = 'ACTIVE').",
          expectedOutput: "Users with verified active subscriptions.",
          hint: "WHERE EXISTS (SELECT 1 FROM sip_mandates s WHERE s.user_id = u.user_id AND s.status = 'ACTIVE')",
          solution: "SELECT u.user_id, u.name, u.email FROM users u WHERE EXISTS (SELECT 1 FROM sip_mandates s WHERE s.user_id = u.user_id AND s.status = 'ACTIVE');"
        },
        {
          title: "Derived Table Aggregation: Average User Lifetime Value",
          problem: "First calculate the total investment per user in a subquery (derived table), then calculate the average lifetime value across all investors.",
          scenario: "Executive unit economics calculation.",
          instructions: "1. In FROM clause, write derived table: `(SELECT user_id, SUM(amount) AS user_total FROM transactions WHERE status = 'SUCCESS' GROUP BY user_id) AS user_totals`.\n2. In outer query, compute AVG(user_total).",
          expectedOutput: "Single scalar number representing average investor lifetime investment.",
          hint: "SELECT ROUND(AVG(user_total), 2) FROM (SELECT ... GROUP BY user_id) AS dt",
          solution: "SELECT ROUND(AVG(user_total), 2) AS avg_investor_ltv FROM (SELECT user_id, SUM(amount) AS user_total FROM transactions WHERE status = 'SUCCESS' GROUP BY user_id) AS user_totals;"
        }
      ],
      assignment: {
        title: "Weekly Assessment 3: FinTech Benchmark & Investor Cohort Subquery Suite",
        scenario: "Synthesize Weeks 1–3 SQL capabilities into a comprehensive analytics script calculating relative benchmarks and customer segments.",
        deliverable: "Write 5 production SQL queries:\n1. Find all users who executed a transaction above ₹50,000 but have NO active SIP mandate (lump-sum investors without recurring commitment).\n2. For each transaction, display the amount and the percentage it represents of that customer's total lifetime investment.\n3. Find all mutual fund schemes whose average transaction size is greater than the overall platform average.\n4. Using NOT EXISTS, find users who registered more than 30 days ago and have NEVER initiated a payment attempt.\n5. Write a derived table query that ranks states by total volume and selects the top 3 states.",
        completionCriteria: "All 5 queries syntactically verified, utilizing scalar subqueries, derived tables, and EXISTS/NOT EXISTS clauses."
      },
      assessment: {
        mcqs: [
          { question: "What happens if a scalar subquery used with an equality operator (=) returns 3 rows?", options: ["SQL picks the first row.", "SQL throws an error: 'more than one row returned by a subquery used as an expression'.", "SQL converts it to an IN operator automatically.", "It returns NULL."], correct: 1, explanation: "Scalar subqueries must return strictly one row and one column. If multiple rows are returned, the comparison operator fails with a runtime error." },
          { question: "Why is EXISTS generally more performant than IN when checking for record existence across large tables?", options: ["EXISTS only works on small tables.", "EXISTS stops scanning the table immediately upon finding the first matching record (early exit), while IN may evaluate the full list.", "EXISTS bypasses the database engine.", "IN is slower because it is an older command."], correct: 1, explanation: "EXISTS implements short-circuit evaluation: as soon as a single match is found, it returns TRUE without scanning the remainder of the child table." },
          { question: "What is a Correlated Subquery?", options: ["A subquery that runs on a different database.", "A subquery that references a column from the outer query and must be evaluated repeatedly for each row of the outer query.", "A subquery that runs once before the main query.", "A subquery with two SELECT statements."], correct: 1, explanation: "A correlated subquery depends on values from the outer query row currently being evaluated." },
          { question: "What must you always provide when placing a subquery in the FROM clause (Derived Table)?", options: ["A WHERE clause", "A table alias (e.g. `AS derived_tbl`)", "A GROUP BY clause", "A Primary Key"], correct: 1, explanation: "Every derived table (subquery in FROM) must have a table alias so the outer query can reference its columns." },
          { question: "How does NOT IN behave if the subquery returns even a single NULL value?", options: ["It ignores the NULL.", "The entire NOT IN expression evaluates to UNKNOWN, returning zero rows.", "It converts the NULL to 0.", "It throws a syntax error."], correct: 1, explanation: "If a subquery used with NOT IN returns a NULL, the condition evaluates to UNKNOWN for all rows, returning an empty result set. Use NOT EXISTS instead to avoid this trap." }
        ],
        scenarios: [
          { question: "Why is writing `SELECT user_id, (SELECT name FROM users WHERE user_id = t.user_id) FROM transactions t` generally inferior to an INNER JOIN?", solution: "The subquery in the SELECT list is a correlated scalar subquery that executes once per transaction row (100,000 executions for 100,000 transactions). An INNER JOIN allows the database query optimizer to perform a single set-based Hash Join or Merge Join, running 100x faster." },
          { question: "How can you use a subquery to find the second highest transaction amount in a table?", solution: "SELECT MAX(amount) FROM transactions WHERE amount < (SELECT MAX(amount) FROM transactions WHERE status = 'SUCCESS'); (Finds the maximum amount that is strictly less than the overall maximum)." },
          { question: "Explain why derived tables in the FROM clause are useful when you need to calculate an aggregate of an aggregate.", solution: "SQL prohibits nesting aggregate functions directly (e.g. `AVG(SUM(amount))` is illegal). You must first calculate the inner aggregate in a derived table (`SELECT user_id, SUM(amount) AS total FROM ... GROUP BY user_id`), then take the outer `AVG(total)`." }
        ],
        miniAssignment: "Write a query selecting customers whose total order spending is greater than the average total customer order spending."
      }
    },

    // DAY 22
    {
      day: 22, phase: "SQL", phaseId: 1,
      title: "Common Table Expressions (CTEs) & Modular Query Design",
      difficulty: "Intermediate-Advanced", duration: 180,
      objectives: [
        "Master the WITH clause to write clean, readable Common Table Expressions (CTEs).",
        "Refactor messy, deeply nested subqueries into modular, sequential analytical pipelines.",
        "Chain multiple CTEs together (e.g. `WITH CleanData AS (...), AggregatedData AS (...), FinalOutput AS (...)`).",
        "Implement complex multi-stage financial calculations (cleaning -> aggregation -> KPI calculation) with professional readability."
      ],
      prerequisites: "Day 21 subqueries and multi-table joins.",
      expectedOutcome: "The ability to architect enterprise-grade, multi-stage SQL pipelines that are modular, self-documenting, and easy for peer analysts to review.",
      topics: [
        {
          concept: "Common Table Expressions (The WITH Clause)",
          what: "A CTE creates a temporary, named result set that exists only during the execution of a single query.",
          why: "Nested subqueries read inside-out like Russian nesting dolls, making them unreadable and difficult to debug. CTEs read top-to-bottom like clean procedural code.",
          how: "WITH MonthlyInflows AS (SELECT DATE_TRUNC('month', created_at) AS txn_month, SUM(amount) AS volume FROM transactions WHERE status = 'SUCCESS' GROUP BY 1) SELECT txn_month, volume FROM MonthlyInflows WHERE volume > 1000000;",
          example: "WITH TopInvestors AS (SELECT user_id, SUM(amount) AS total FROM transactions GROUP BY user_id HAVING SUM(amount) > 500000) SELECT u.name, t.total FROM users u JOIN TopInvestors t ON u.user_id = t.user_id;",
          businessCase: "Multi-stage pipeline: Step 1 = filter successful transactions, Step 2 = aggregate by user and month, Step 3 = calculate growth against benchmark.",
          pitfalls: "Placing multiple `WITH` keywords when chaining CTEs. Use `WITH` once, followed by comma-separated CTE names."
        },
        {
          concept: "Multi-CTE Chaining & Analytical Pipelines",
          what: "Defining multiple CTEs in a single query where each subsequent CTE can reference any preceding CTE.",
          why: "Enterprise analytics requires complex staged logic: Stage A cleans raw data, Stage B aggregates metrics, Stage C calculates ratios, Stage D joins dimensions.",
          how: "WITH Stage1 AS (SELECT ...), Stage2 AS (SELECT ... FROM Stage1 ...), Stage3 AS (SELECT ... FROM Stage2 ...) SELECT * FROM Stage3;",
          example: "WITH CleanedTxns AS (...), UserMetrics AS (...), RankedUsers AS (...) SELECT * FROM RankedUsers WHERE rank <= 10;",
          businessCase: "Reconciling gateway payment success rates, joining bank metadata, and calculating payout liabilities in a single query.",
          pitfalls: "Treating CTEs as permanent database tables. CTEs vanish the millisecond query execution concludes."
        }
      ],
      resources: [
        { title: "SQL CTEs (Common Table Expressions) Explained Simply", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+CTE+Common+Table+Expression+Tutorial", time: "30 mins", covers: "WITH clause syntax, subquery refactoring, and readability benefits." },
        { title: "PostgreSQL Official Documentation: WITH Queries (CTEs)", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/queries-with.html", time: "25 mins", covers: "Common table expressions, recursive CTEs, and optimization." },
        { title: "Refactoring Complex SQL Queries Using CTEs", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+SQL+CTE+vs+Subquery+Refactoring", time: "35 mins", covers: "Staged pipelines and enterprise SQL design." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 21 subquery types and derived tables." },
        { time: "50 mins", activity: "Concept Study: Study WITH syntax, CTE chaining, and refactoring techniques." },
        { time: "25 mins", activity: "Guided Practice: Replicate multi-stage financial calculation pipelines." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 CTE architecture challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: 3-Stage FinTech Monthly Performance Pipeline." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 22 assessment questions." }
      ],
      exercises: [
        {
          title: "Refactor Nested Subquery into Clean CTE",
          problem: "Refactor the query finding users with above-average total investment from a derived table into a clean `WITH` expression.",
          scenario: "Improving codebase maintainability for peer code reviews.",
          instructions: "1. Define CTE `UserTotals` computing sum of amount per user.\n2. In main query, compute average of total.\n3. Filter users above average.",
          expectedOutput: "Clean, readable SQL code adhering to modern engineering standards.",
          hint: "WITH UserTotals AS (SELECT user_id, SUM(amount) AS total_invested FROM transactions GROUP BY user_id) SELECT ...",
          solution: "WITH UserTotals AS (SELECT user_id, SUM(amount) AS total_invested FROM transactions WHERE status = 'SUCCESS' GROUP BY user_id) SELECT user_id, total_invested FROM UserTotals WHERE total_invested > (SELECT AVG(total_invested) FROM UserTotals) ORDER BY total_invested DESC;"
        },
        {
          title: "Multi-CTE Chain: Gateway Volume and Failure Share",
          problem: "Chain 2 CTEs: 1) `GatewayTotals` calculating total volume per gateway, 2) `PlatformTotal` calculating total overall volume. Compute market share per gateway.",
          scenario: "Executive market share analysis.",
          instructions: "1. CTE 1: GatewayTotals (gateway, g_vol).\n2. CTE 2: PlatformTotal (p_vol).\n3. Main query: compute g_vol / p_vol * 100.",
          expectedOutput: "Each gateway with its exact percentage share of total volume.",
          hint: "WITH GatewayTotals AS (...), PlatformTotal AS (...) SELECT ...",
          solution: "WITH GatewayTotals AS (SELECT payment_gateway, SUM(amount) AS g_vol FROM transactions WHERE status = 'SUCCESS' GROUP BY payment_gateway), PlatformTotal AS (SELECT SUM(amount) AS p_vol FROM transactions WHERE status = 'SUCCESS') SELECT g.payment_gateway, g.g_vol, p.p_vol, ROUND(100.0 * g.g_vol / p.p_vol, 2) AS market_share_pct FROM GatewayTotals g CROSS JOIN PlatformTotal p ORDER BY market_share_pct DESC;"
        },
        {
          title: "Staged User Funnel Pipeline with CTEs",
          problem: "Build a 3-stage funnel CTE: 1) RegisteredUsers, 2) VerifiedKYCUsers, 3) TransactingUsers. Output conversion rates.",
          scenario: "Growth product team weekly funnel conversion metrics.",
          instructions: "1. Stage 1: count all users.\n2. Stage 2: count KYC verified users.\n3. Stage 3: count users who transacted.\n4. Output single summary row.",
          expectedOutput: "Total signups, KYC rate %, and transaction conversion rate %.",
          hint: "Use separate CTEs or conditional counting inside CTE.",
          solution: "WITH FunnelMetrics AS (SELECT COUNT(*) AS total_signups, COUNT(CASE WHEN kyc_status = 'VERIFIED' THEN 1 END) AS verified_users, COUNT(DISTINCT CASE WHEN t.txn_id IS NOT NULL THEN u.user_id END) AS transacting_users FROM users u LEFT JOIN transactions t ON u.user_id = t.user_id) SELECT total_signups, verified_users, transacting_users, ROUND(100.0 * verified_users / total_signups, 2) AS kyc_conv_pct, ROUND(100.0 * transacting_users / total_signups, 2) AS txn_conv_pct FROM FunnelMetrics;"
        }
      ],
      assignment: {
        title: "3-Stage FinTech Monthly Operational Intelligence Pipeline",
        scenario: "Construct an end-to-end analytical pipeline using chained CTEs to summarize customer acquisition, gateway stability, and investment retention.",
        deliverable: "Write a comprehensive multi-CTE query containing:\n1. CTE `CleanedTransactions`: Filter successful transactions, standardize gateway casing, and extract transaction month.\n2. CTE `CustomerMetrics`: Aggregate total transactions, total volume, and active months per customer.\n3. CTE `HighValueCohort`: Filter customers with > ₹2,00,000 volume and calculate their average transaction frequency.\n4. Main Query: Join customer demographics and output the final executive cohort report.",
        completionCriteria: "Single production query utilizing chained CTEs with clean indentation, descriptive naming, and zero syntax errors."
      },
      assessment: {
        mcqs: [
          { question: "Which SQL keyword initiates a Common Table Expression (CTE)?", options: ["LET", "WITH", "DECLARE", "TEMP"], correct: 1, explanation: "The WITH keyword introduces a Common Table Expression." },
          { question: "How do you define multiple CTEs in a single query?", options: ["Write WITH before every CTE name.", "Use the WITH keyword once, and separate subsequent CTE definitions with commas.", "Use semicolons between CTEs.", "CTEs cannot be chained."], correct: 1, explanation: "You write WITH once at the start: `WITH CTE1 AS (...), CTE2 AS (...) SELECT ...`." },
          { question: "What is the primary advantage of CTEs over deeply nested subqueries?", options: ["CTEs run 10x faster automatically in every database.", "CTEs dramatically improve code readability and maintainability by structuring queries sequentially from top to bottom.", "CTEs allow Excel exports.", "CTEs do not require aliases."], correct: 1, explanation: "CTEs eliminate messy inside-out nested subqueries, organizing complex logic into clear, readable, sequential stages." },
          { question: "How long does a CTE persist in the database?", options: ["Forever until dropped.", "Until the database restarts.", "Only for the duration of the single query in which it is defined.", "For 24 hours."], correct: 2, explanation: "A CTE is temporary and exists only during the execution of that specific SQL statement." },
          { question: "Can a CTE reference a preceding CTE defined earlier in the same WITH clause?", options: ["No, CTEs are strictly isolated.", "Yes, any CTE can reference any CTE defined before it in the same query.", "Only if using recursive CTEs.", "Only in PostgreSQL."], correct: 1, explanation: "In chained CTEs, any subsequent CTE can reference any previously defined CTE in the same WITH statement." }
        ],
        scenarios: [
          { question: "In modern database optimizers (like PostgreSQL 12+), do CTEs degrade performance compared to subqueries?", solution: "Historically, PostgreSQL materialized CTEs (creating an optimization fence). In modern PostgreSQL 12+, CTEs are inlined by default unless explicitly specified with AS MATERIALIZED, meaning CTEs achieve the exact same optimal execution plan as subqueries while remaining far more readable." },
          { question: "Why should you avoid writing a CTE if you need to use the exact same temporary dataset across 5 completely separate queries in a session?", solution: "A CTE only exists for one query. If you need the same intermediate table across multiple independent queries or stored procedures, use a Temporary Table (`CREATE TEMP TABLE my_temp AS ...`) or a Database View." },
          { question: "What is a Recursive CTE and name one common financial application?", solution: "A Recursive CTE is a CTE that references itself to traverse hierarchical or sequential data. A common financial application is modeling loan amortization schedules (calculating interest, principal, and remaining balance month-by-month iteratively) or organizational reporting structures." }
        ],
        miniAssignment: "Write a query with a CTE named HighOrders that selects all orders with amount > 500, then joins it with customer table in the main query."
      }
    },

    // DAY 23
    {
      day: 23, phase: "SQL", phaseId: 1,
      title: "Temporal Analysis: Date Functions & Time Series Intervals",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master temporal data types: DATE, TIME, TIMESTAMP, and TIMESTAMPTZ.",
        "Truncate dates into reporting buckets using DATE_TRUNC('month', created_at) or FORMAT().",
        "Extract specific calendar components using EXTRACT(YEAR/MONTH/DOW FROM date).",
        "Perform date arithmetic using INTERVAL ('30 days', '1 month') and calculate elapsed days using AGE() or DATEDIFF()."
      ],
      prerequisites: "Days 11-22 SQL foundations and aggregations.",
      expectedOutcome: "The ability to perform cohort retention analysis, calculate account age, track SIP execution cadences, and build monthly trend reports.",
      topics: [
        {
          concept: "Date Truncation & Component Extraction",
          what: "DATE_TRUNC rounds a timestamp down to specified precision (year, quarter, month, week, day). EXTRACT pulls out an integer component (e.g. day of week).",
          why: "Financial transactions occur at granular seconds ('2024-11-18 14:32:05'). To report monthly trends, you must truncate them to month starts ('2024-11-01 00:00:00').",
          how: "SELECT DATE_TRUNC('month', created_at) AS txn_month, SUM(amount) FROM transactions GROUP BY 1 ORDER BY 1;",
          example: "EXTRACT(DOW FROM created_at) returns 0 (Sunday) to 6 (Saturday) to evaluate weekend volume drops.",
          businessCase: "Aggregating daily transaction noise into executive Monthly and Quarterly Gross Merchandise Value (GMV) charts.",
          pitfalls: "Grouping by EXTRACT(MONTH FROM date) alone without including the year, which dangerously merges November 2023 with November 2024."
        },
        {
          concept: "Date Arithmetic & Age Calculation",
          what: "Adding or subtracting temporal intervals (`created_at + INTERVAL '30 days'`) and calculating duration between two dates.",
          why: "Tracking regulatory compliance (KYC must be completed within 30 days of registration) and customer tenure (days since first deposit).",
          how: "SELECT user_id, NOW() - created_at AS account_tenure, DATE_PART('day', NOW() - created_at) AS tenure_days FROM users;",
          example: "WHERE created_at >= NOW() - INTERVAL '90 days' dynamically filters the rolling last 90 days without hardcoding dates.",
          businessCase: "Automated alerting for SIP mandates due to execute within the next 48 hours.",
          pitfalls: "Hardcoding calendar dates ('2024-10-01') in automated daily batch jobs instead of dynamic rolling functions like `CURRENT_DATE - INTERVAL '7 days'`."
        }
      ],
      resources: [
        { title: "PostgreSQL Date & Time Functions Official Guide", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/functions-datetime.html", time: "25 mins", covers: "DATE_TRUNC, EXTRACT, intervals, and timezone handling." },
        { title: "SQL Date Functions & Rolling Windows Tutorial", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Date+Functions+Tutorial", time: "30 mins", covers: "Date extraction, formatting, and time intervals." },
        { title: "Mastering Time Series Analysis in SQL", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+SQL+Date+Time+Series+Analysis", time: "30 mins", covers: "Monthly aggregations and rolling date filters." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 22 CTE architecture and WITH clause." },
        { time: "50 mins", activity: "Concept Study: Study DATE_TRUNC, EXTRACT, INTERVAL, and date arithmetic." },
        { time: "25 mins", activity: "Guided Practice: Replicate monthly trends, weekend analysis, and tenure tracking." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 temporal query challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Rolling 90-Day FinTech Investment Velocity Report." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 23 assessment questions." }
      ],
      exercises: [
        {
          title: "Monthly Investment Trend with DATE_TRUNC",
          problem: "Aggregate transactions by calendar month, displaying the month start date, total successful volume, and distinct transacting investors.",
          scenario: "Executive monthly board report.",
          instructions: "1. Truncate `created_at` to month using DATE_TRUNC('month', created_at).\n2. Filter status = 'SUCCESS'.\n3. GROUP BY 1 and ORDER BY 1.",
          expectedOutput: "Chronological monthly timeline of investment volume.",
          hint: "SELECT DATE_TRUNC('month', created_at)::DATE AS txn_month, SUM(amount) ... GROUP BY 1",
          solution: "SELECT DATE_TRUNC('month', created_at)::DATE AS txn_month, SUM(amount) AS total_volume, COUNT(DISTINCT user_id) AS active_investors FROM transactions WHERE status = 'SUCCESS' GROUP BY 1 ORDER BY 1 ASC;"
        },
        {
          title: "Analyze Payment Failures by Day of the Week",
          problem: "Extract day of week from transaction timestamp (0=Sun, 6=Sat) and compute failure rate percentage per weekday.",
          scenario: "Investigating bank server weekend maintenance downtime.",
          instructions: "1. Use EXTRACT(DOW FROM created_at) AS day_of_week.\n2. Compute total count and failure rate %.\n3. GROUP BY 1 and ORDER BY 1.",
          expectedOutput: "Seven rows representing Sunday through Saturday with failure rates.",
          hint: "EXTRACT(DOW FROM created_at) ... GROUP BY 1",
          solution: "SELECT EXTRACT(DOW FROM created_at) AS dow, TO_CHAR(created_at, 'Day') AS day_name, COUNT(*) AS total_txns, ROUND(100.0 * COUNT(CASE WHEN status = 'FAILED' THEN 1 END) / COUNT(*), 2) AS failure_rate_pct FROM transactions GROUP BY 1, 2 ORDER BY dow ASC;"
        },
        {
          title: "Dynamic Rolling 30-Day New User Retention",
          problem: "Find all users registered within the rolling last 30 days, calculating days elapsed since signup.",
          scenario: "Early-life onboarding engagement campaign.",
          instructions: "1. Filter `created_at >= CURRENT_DATE - INTERVAL '30 days'`.\n2. Compute `CURRENT_DATE - created_at::DATE AS days_active`.\n3. ORDER BY days_active ASC.",
          expectedOutput: "Recent signups with dynamic tenure calculation.",
          hint: "WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'",
          solution: "SELECT user_id, name, email, created_at::DATE AS signup_date, CURRENT_DATE - created_at::DATE AS days_active FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '30 days' ORDER BY signup_date DESC;"
        }
      ],
      assignment: {
        title: "Rolling 90-Day FinTech Investment Velocity & Seasonality Report",
        scenario: "Produce a time-series operational audit analyzing payment velocity, settlement delays, and customer activation speed.",
        deliverable: "Write 4 SQL queries:\n1. Month-over-month total GMV and average ticket size for the last 12 calendar months.\n2. Calculate the average time elapsed (in days and hours) between customer registration and their first successful investment.\n3. Hourly transaction distribution: group transactions by hour of the day (0 to 23) to identify peak server traffic windows.\n4. Mandate Execution Cadence: Find active SIP mandates whose scheduled debit date falls on a weekend in the upcoming month.",
        completionCriteria: "Accurate queries demonstrating mastery of DATE_TRUNC, EXTRACT, INTERVAL, and date interval arithmetic."
      },
      assessment: {
        mcqs: [
          { question: "What does DATE_TRUNC('month', '2024-11-18 14:32:05'::timestamp) return in PostgreSQL?", options: ["'2024-11-01 00:00:00'", "'2024-11-18 00:00:00'", "'11'", "'2024-11-30 23:59:59'"], correct: 0, explanation: "DATE_TRUNC('month', ...) resets all time units smaller than 'month' to their starting minimum, yielding November 1st at midnight." },
          { question: "Why is grouping by EXTRACT(MONTH FROM date) risky for historical business reports spanning multiple years?", options: ["EXTRACT is slower than DATE_TRUNC.", "It combines the same calendar month from different years together (e.g. Jan 2023 and Jan 2024 both return 1), corrupting growth trends.", "It only works on dates before 2020.", "It throws an error on leap years."], correct: 1, explanation: "EXTRACT(MONTH FROM ...) returns an integer 1 to 12. Without filtering or grouping by year, it merges data from multiple years into the same bucket." },
          { question: "How do you filter records from the rolling last 7 days in PostgreSQL without hardcoding dates?", options: ["WHERE date >= TODAY - 7", "WHERE date >= CURRENT_DATE - INTERVAL '7 days'", "WHERE date IN (LAST_7_DAYS)", "WHERE DATEDIFF(date, NOW()) = 7"], correct: 1, explanation: "In PostgreSQL, subtracting an `INTERVAL '7 days'` from `CURRENT_DATE` dynamically computes the exact rolling 7-day cutoff." },
          { question: "What function extracts the Day of Week (0-6) from a timestamp in PostgreSQL?", options: ["DAYOFWEEK()", "EXTRACT(DOW FROM timestamp)", "WEEKDAY()", "DATE_TO_DOW()"], correct: 1, explanation: "EXTRACT(DOW FROM timestamp) returns the day of the week, where 0 represents Sunday and 6 represents Saturday." },
          { question: "What is the difference between TIMESTAMP and TIMESTAMPTZ in PostgreSQL?", options: ["There is no difference.", "TIMESTAMPTZ stores timezone awareness and converts to the client's local timezone upon retrieval; TIMESTAMP stores naive local time with no timezone data.", "TIMESTAMPTZ is for text only.", "TIMESTAMP is deprecated."], correct: 1, explanation: "TIMESTAMPTZ represents absolute UTC moments and automatically formats to client timezone, essential for global financial systems." }
        ],
        scenarios: [
          { question: "A report calculated customer age in days using: NOW()::date - signup_date::date. What is the business advantage of casting to ::date first?", solution: "Casting to `::date` truncates the hour, minute, and second components. Subtracting two pure dates returns a clean integer number of days, avoiding fractional day discrepancies caused by the current time of day." },
          { question: "How do you identify transactions that took more than 48 hours to settle between `initiated_at` and `settled_at`?", solution: "WHERE settled_at - initiated_at > INTERVAL '48 hours' (or DATE_PART('day', settled_at - initiated_at) >= 2)." },
          { question: "How can you generate a continuous series of all dates in a month (including days with zero transactions) in PostgreSQL?", solution: "Use the generate_series function: SELECT generate_series('2024-11-01'::date, '2024-11-30'::date, '1 day'::interval)::date AS calendar_date; then LEFT JOIN transactions on transaction_date = calendar_date." }
        ],
        miniAssignment: "Write a query selecting date_trunc('week', order_date) as order_week and sum(amount) from orders group by 1 order by 1."
      }
    },

    // DAY 24
    {
      day: 24, phase: "SQL", phaseId: 1,
      title: "Analytical Window Functions: ROW_NUMBER, RANK, DENSE_RANK, LAG & LEAD",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Master the OVER() clause: understand how Window Functions calculate values without collapsing rows like GROUP BY.",
        "Implement partitioning and ordering inside windows: PARTITION BY and ORDER BY.",
        "Differentiate ranking algorithms: ROW_NUMBER() (unique integers), RANK() (skips numbers on ties), and DENSE_RANK() (no skips).",
        "Perform chronological sequential analysis using LAG() (look at previous row) and LEAD() (look at next row).",
        "Solve high-frequency technical interview challenges: Top N per category, MoM growth, and churn detection."
      ],
      prerequisites: "Days 15-23 aggregations, grouping, and date functions.",
      expectedOutcome: "The ability to rank top-performing schemes, find customers' previous deposit dates, calculate transaction intervals, and solve advanced analytical queries.",
      topics: [
        {
          concept: "Window Functions Architecture & The OVER() Clause",
          what: "A window function performs a calculation across a set of table rows that are related to the current row, while retaining individual row identities.",
          why: "GROUP BY collapses 1,000 transaction rows into 5 category rows. Window functions keep all 1,000 rows while displaying category totals and ranks alongside each transaction.",
          how: "SELECT txn_id, amount, category, ROW_NUMBER() OVER(PARTITION BY category ORDER BY amount DESC) AS rank_in_cat FROM transactions;",
          example: "Finding each user's latest transaction: WHERE rn = 1 using a CTE and ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC).",
          businessCase: "Isolating each investor's first deposit date and most recent deposit date to analyze retention.",
          pitfalls: "Attempting to use a Window Function inside the WHERE clause directly. Window functions evaluate after WHERE; you must wrap them in a CTE or subquery."
        },
        {
          concept: "Chronological Sequential Analysis with LAG & LEAD",
          what: "LAG(column, offset) accesses data from a previous row in the window. LEAD(column, offset) accesses data from a subsequent row.",
          why: "In FinTech, you need to know: 'How much did the customer deposit last time?' and 'How many days elapsed since their last transaction?'",
          how: "SELECT user_id, amount, created_at, LAG(amount, 1) OVER(PARTITION BY user_id ORDER BY created_at ASC) AS prev_amount, created_at - LAG(created_at, 1) OVER(PARTITION BY user_id ORDER BY created_at ASC) AS days_since_last FROM transactions;",
          example: "Calculating Month-over-Month growth in a single table without self-joining.",
          businessCase: "Detecting churn risk: customers whose deposit intervals increase from 30 days to 75+ days.",
          pitfalls: "Forgetting to specify ORDER BY inside the OVER() clause when using LAG/LEAD, leading to arbitrary row ordering."
        }
      ],
      resources: [
        { title: "SQL Window Functions Masterclass (ROW_NUMBER, RANK, DENSE_RANK)", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Window+Functions+Masterclass", time: "35 mins", covers: "OVER, PARTITION BY, ranking functions, and interview problems." },
        { title: "LAG & LEAD Window Functions in SQL Explained Visually", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+SQL+LAG+LEAD+Window+Functions", time: "30 mins", covers: "Sequential comparisons and growth rate calculations." },
        { title: "PostgreSQL Window Functions Official Documentation", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/tutorial-window.html", time: "25 mins", covers: "Official tutorial on window frames and syntax." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 23 date functions and DATE_TRUNC." },
        { time: "50 mins", activity: "Concept Study: Study OVER(), PARTITION BY, ROW_NUMBER vs RANK vs DENSE_RANK, and LAG/LEAD." },
        { time: "25 mins", activity: "Guided Practice: Replicate Top N per group and sequential lag calculations." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 window function challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Top Schemes per Category & Customer Cadence Audit." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 24 assessment questions." }
      ],
      exercises: [
        {
          title: "Top 3 Largest Transactions per Mutual Fund Category",
          problem: "Using DENSE_RANK(), find the top 3 largest transactions in each fund category.",
          scenario: "Category manager identifying anchor investments.",
          instructions: "1. In a CTE, compute `DENSE_RANK() OVER(PARTITION BY category ORDER BY amount DESC) AS rank`.\n2. In outer query, filter `WHERE rank <= 3`.\n3. ORDER BY category, rank.",
          expectedOutput: "Top 3 transactions per category with no ties skipped.",
          hint: "WITH RankedTxns AS (SELECT ..., DENSE_RANK() OVER(PARTITION BY category ORDER BY amount DESC) AS rnk FROM ...) SELECT ... WHERE rnk <= 3",
          solution: "WITH RankedTxns AS (SELECT txn_id, category, amount, DENSE_RANK() OVER(PARTITION BY category ORDER BY amount DESC) AS rnk FROM transactions WHERE status = 'SUCCESS') SELECT category, rnk, txn_id, amount FROM RankedTxns WHERE rnk <= 3 ORDER BY category, rnk ASC;"
        },
        {
          title: "Calculate Customer Deposit Increase over Previous Deposit with LAG",
          problem: "For every customer transaction, display current amount, previous transaction amount, and the variance (current - previous).",
          scenario: "Identifying whether customers are stepping up their investment amounts.",
          instructions: "1. Use `LAG(amount) OVER(PARTITION BY user_id ORDER BY created_at ASC) AS prev_amount`.\n2. Compute variance: amount - LAG(amount)...",
          expectedOutput: "Transactions with previous amount and step-up variance.",
          hint: "amount - LAG(amount) OVER(PARTITION BY user_id ORDER BY created_at ASC)",
          solution: "SELECT user_id, txn_id, created_at, amount, LAG(amount) OVER(PARTITION BY user_id ORDER BY created_at ASC) AS prev_amount, amount - LAG(amount) OVER(PARTITION BY user_id ORDER BY created_at ASC) AS step_up_amount FROM transactions WHERE status = 'SUCCESS' ORDER BY user_id, created_at ASC;"
        },
        {
          title: "Deduplicate Transactions Keeping Only the Latest Status",
          problem: "Given multiple status updates for the same transaction, retrieve only the most recent record per transaction_id using ROW_NUMBER().",
          scenario: "Payment webhook idempotency deduplication.",
          instructions: "1. In CTE: `ROW_NUMBER() OVER(PARTITION BY txn_id ORDER BY updated_at DESC) AS rn`.\n2. Filter `WHERE rn = 1`.",
          expectedOutput: "Unique list of transactions reflecting strictly the latest status update.",
          hint: "ROW_NUMBER() OVER(PARTITION BY txn_id ORDER BY updated_at DESC) ... WHERE rn = 1",
          solution: "WITH LatestUpdates AS (SELECT txn_id, status, updated_at, ROW_NUMBER() OVER(PARTITION BY txn_id ORDER BY updated_at DESC) AS rn FROM transaction_logs) SELECT txn_id, status, updated_at FROM LatestUpdates WHERE rn = 1;"
        }
      ],
      assignment: {
        title: "FinTech Top Schemes & Customer Cadence Window Function Suite",
        scenario: "Deliver an analytical query suite answering advanced stakeholder questions using window functions.",
        deliverable: "Write 4 SQL queries:\n1. Top 2 highest-performing funds in each asset class ranked by AUM.\n2. Calculate Month-over-Month GMV growth % using LAG() over monthly volume.\n3. Identify customer accounts where the elapsed time between two consecutive transactions exceeded 60 days.\n4. Running Total: Calculate the cumulative running total of platform volume across the year using `SUM(amount) OVER(ORDER BY created_at ASC)`.",
        completionCriteria: "Accurate queries utilizing ROW_NUMBER, DENSE_RANK, LAG, and running total window frames."
      },
      assessment: {
        mcqs: [
          { question: "What is the key difference between a Window Function and a GROUP BY aggregation?", options: ["Window functions run on text only.", "GROUP BY collapses individual rows into a single summary row per group; Window functions calculate aggregates while preserving all individual rows.", "Window functions cannot calculate sums.", "GROUP BY does not work with WHERE."], correct: 1, explanation: "GROUP BY reduces row count by collapsing groups; Window functions return the original row count, displaying calculated window values alongside each individual record." },
          { question: "If two rows tie for 2nd place, what will the next row's rank be under RANK() versus DENSE_RANK()?", options: ["RANK gives 3, DENSE_RANK gives 4.", "RANK gives 4 (skips 3); DENSE_RANK gives 3 (no skips).", "Both give 3.", "Both give 4."], correct: 1, explanation: "RANK() leaves gaps when ties occur (1, 2, 2, 4), while DENSE_RANK() never leaves gaps (1, 2, 2, 3)." },
          { question: "Why can't you write WHERE ROW_NUMBER() OVER(...) = 1 directly in a single SELECT query?", options: ["It is a bug in SQL.", "Because the WHERE clause executes before Window functions in SQL logical query processing; you must use a CTE or derived table to filter on window outputs.", "Because ROW_NUMBER only works in views.", "Window functions only work in stored procedures."], correct: 1, explanation: "Window functions evaluate in the SELECT phase, which happens after WHERE. To filter by window outputs, wrap them in a CTE or subquery." },
          { question: "What does the PARTITION BY clause do inside OVER()?", options: ["Divides the hard drive into partitions.", "Subdivides the dataset into independent groups across which the window function is applied separately.", "Sorts the rows.", "Filters out NULLs."], correct: 1, explanation: "PARTITION BY resets window calculations for each specified partition group (e.g. ranking restarts at 1 for each category)." },
          { question: "Which window function allows you to look at the subsequent (following) row in a sorted sequence?", options: ["PREV()", "LEAD()", "LAG()", "NEXT()"], correct: 1, explanation: "LEAD() fetches values from following rows, while LAG() fetches values from preceding rows." }
        ],
        scenarios: [
          { question: "How do you calculate a 30-day rolling moving average of daily transaction volume using a window frame?", solution: "SELECT txn_date, daily_vol, ROUND(AVG(daily_vol) OVER(ORDER BY txn_date ASC ROWS BETWEEN 29 PRECEDING AND CURRENT ROW), 2) AS moving_avg_30d FROM daily_volumes;" },
          { question: "A stakeholder asks for a running cumulative total of investments over the year. How do you write this in a single window expression?", solution: "SELECT txn_id, created_at, amount, SUM(amount) OVER(ORDER BY created_at ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_running_total FROM transactions WHERE status = 'SUCCESS';" },
          { question: "Why would a data engineer prefer ROW_NUMBER() over RANK() when implementing a query to deduplicate records?", solution: "ROW_NUMBER() assigns strictly unique, sequential integers (1, 2, 3...) even if duplicate records have identical timestamps and amounts. RANK() would assign identical ranks (1, 1), failing to isolate a single row when filtering WHERE rank = 1." }
        ],
        miniAssignment: "Write a query selecting department_id, employee_id, salary, and rank of salary within department using DENSE_RANK()."
      }
    },

    // DAY 25 (Phase 2 Exam)
    {
      day: 25, phase: "SQL", phaseId: 1,
      title: "Phase 2 Comprehensive Examination: Production SQL Certification & Timed Challenge",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Evaluate comprehensive mastery across all Phase 2 SQL competencies (Days 11–24).",
        "Test high-speed proficiency in multi-table joins, aggregations, CTEs, subqueries, and window functions under timed conditions.",
        "Solve real-world FinTech business questions: customer cohort retention, gateway SLA reconciliation, and portfolio performance.",
        "Achieve the mandatory 75% examination pass mark to unlock Phase 3 (Power BI)."
      ],
      prerequisites: "Completion of Days 11 through 24 modules and assignments.",
      expectedOutcome: "Certified Phase 2 SQL completion badge and verified technical confidence to query production databases and build data models in Power BI.",
      topics: [
        {
          concept: "Phase 2 Competency Synthesis & Query Optimization",
          what: "Synthesizing schema comprehension, joins, group by, CTE pipelines, temporal logic, and analytical window functions into clean queries.",
          why: "In technical interviews for Business Analyst, Product Analyst, and Business Analytics roles, 60% of the live screening consists of real-time SQL challenges.",
          how: "Solve multi-tier practical challenges under timed conditions, verifying syntax, table aliases, and business edge-cases.",
          example: "Combining CTEs, LEFT JOINs, and Window Functions into a single coherent business query.",
          businessCase: "Demonstrating to hiring managers that you write production-ready, performant SQL code independently.",
          pitfalls: "Writing overly convoluted queries without formatting or comments when a clean CTE pipeline accomplishes the goal."
        },
        {
          concept: "Query Execution Plans & Index Utilization",
          what: "Understanding how the database optimizer executes queries using EXPLAIN (Sequential Scan vs Index Scan vs Hash Join).",
          why: "A query that works fine on 1,000 test rows can freeze a production server when executed against 10 million transactions if it forces full table scans.",
          how: "Use `EXPLAIN ANALYZE SELECT ...` to inspect execution time and cost.",
          example: "Adding a composite index `CREATE INDEX idx_user_status ON transactions(user_id, status)` to accelerate joins and filters.",
          businessCase: "Diagnosing why a critical morning operations dashboard query takes 4 minutes to run and optimizing it to run in 1.2 seconds.",
          pitfalls: "Filtering on calculated functions in WHERE clauses that invalidate B-Tree index scans."
        }
      ],
      resources: [
        { title: "Top 20 SQL Interview Questions for Business Analysts", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Top+SQL+Interview+Questions+for+Business+Analyst", time: "35 mins", covers: "Live query problem solving, joins, window functions, and duplicates." },
        { title: "SQL Query Optimization & EXPLAIN ANALYZE Guide", platform: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/using-explain.html", time: "20 mins", covers: "Understanding execution plans, cost estimates, and index scans." },
        { title: "SQL to Power BI Transition Architecture", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+SQL+to+Power+BI+Best+Practices", time: "25 mins", covers: "How SQL queries map directly into Power Query and Power BI data models." }
      ],
      timetable: [
        { time: "15 mins", activity: "Phase 2 Speed Drill: Rapid SQL syntax flashcards and join mechanics." },
        { time: "50 mins", activity: "Advanced Practice: Solve 3 multi-tiered timed query challenges." },
        { time: "25 mins", activity: "Query Optimization: Review execution plans and refactor subqueries into CTEs." },
        { time: "30 mins", activity: "Interview Preparation: Practice articulating SQL logic aloud using business terminology." },
        { time: "40 mins", activity: "Phase 2 Certification Exam: Complete the 25-question technical evaluation." },
        { time: "20 mins", activity: "Results Analysis & Power BI Roadmap: Review missed questions and preview Phase 3." }
      ],
      exercises: [
        {
          title: "Timed Challenge 1: Monthly Cohort Retention Analysis",
          problem: "Write a query calculating the monthly retention rate of new users: What % of users who signed up in Month M transacted in Month M+1?",
          scenario: "Executive board cohort retention scorecard.",
          instructions: "1. CTE 1: UserSignupMonth.\n2. CTE 2: UserFirstTxnMonth.\n3. Compute retention ratio %.\n4. GROUP BY signup_month.",
          expectedOutput: "Monthly cohort table with signup count, active next-month count, and retention %.",
          hint: "Combine DATE_TRUNC with conditional aggregation or multi-CTE joins.",
          solution: "WITH Cohorts AS (SELECT user_id, DATE_TRUNC('month', created_at)::DATE AS signup_month FROM users), Activity AS (SELECT DISTINCT user_id, DATE_TRUNC('month', created_at)::DATE AS txn_month FROM transactions WHERE status = 'SUCCESS') SELECT c.signup_month, COUNT(c.user_id) AS cohort_size, COUNT(a.user_id) AS retained_next_month, ROUND(100.0 * COUNT(a.user_id) / COUNT(c.user_id), 2) AS retention_rate_pct FROM Cohorts c LEFT JOIN Activity a ON c.user_id = a.user_id AND a.txn_month = c.signup_month + INTERVAL '1 month' GROUP BY c.signup_month ORDER BY c.signup_month ASC;"
        },
        {
          title: "Timed Challenge 2: Identify High-Churn Payment Gateways with Window Functions",
          problem: "For each gateway and month, compute total volume, and use LAG() to compute Month-over-Month volume growth %. Flag gateways with negative growth.",
          scenario: "Partner SLA quarterly health review.",
          instructions: "1. CTE MonthlyVol: sum amount by gateway and month.\n2. In main query: compute (vol - LAG(vol)) / LAG(vol) * 100.",
          expectedOutput: "Gateway monthly timeline with MoM growth rates.",
          hint: "LAG(vol) OVER(PARTITION BY gateway ORDER BY month ASC)",
          solution: "WITH MonthlyVol AS (SELECT payment_gateway, DATE_TRUNC('month', created_at)::DATE AS txn_month, SUM(amount) AS volume FROM transactions WHERE status = 'SUCCESS' GROUP BY 1, 2) SELECT payment_gateway, txn_month, volume, LAG(volume) OVER(PARTITION BY payment_gateway ORDER BY txn_month ASC) AS prior_month_vol, ROUND(100.0 * (volume - LAG(volume) OVER(PARTITION BY payment_gateway ORDER BY txn_month ASC)) / NULLIF(LAG(volume) OVER(PARTITION BY payment_gateway ORDER BY txn_month ASC), 0), 2) AS mom_growth_pct FROM MonthlyVol ORDER BY payment_gateway, txn_month ASC;"
        },
        {
          title: "Timed Challenge 3: Top 2 Mutual Funds per Asset Category with Ties Handled",
          problem: "Rank mutual funds within each category by total AUM using DENSE_RANK(), returning the top 2 schemes per category.",
          scenario: "App homepage featured mutual fund carousel.",
          instructions: "1. CTE RankedFunds with DENSE_RANK().\n2. Filter WHERE rank <= 2.",
          expectedOutput: "Top 2 schemes per asset class.",
          hint: "DENSE_RANK() OVER(PARTITION BY category ORDER BY aum DESC)",
          solution: "WITH RankedFunds AS (SELECT fund_id, fund_name, category, aum, DENSE_RANK() OVER(PARTITION BY category ORDER BY aum DESC) AS rnk FROM mutual_funds) SELECT category, rnk, fund_name, aum FROM RankedFunds WHERE rnk <= 2 ORDER BY category, rnk ASC;"
        }
      ],
      assignment: {
        title: "Phase 2 Certification Examination: Production SQL Challenge",
        scenario: "Complete the comprehensive 25-question technical exam covering schema design, multi-table joins, grouping, subqueries, CTEs, and window functions.",
        deliverable: "1. Complete all 5 assessment MCQs (passing mark >= 75%).\n2. Solve the 3 advanced SQL scenario challenges.\n3. Validate query execution syntax and business logic explanations.",
        completionCriteria: "Attain >= 75% on the certification assessment and successfully log completion in your dashboard."
      },
      assessment: {
        mcqs: [
          { question: "Which clause is used to filter records in a query that uses an aggregate function based on the aggregated value?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], correct: 1, explanation: "The HAVING clause filters summary groups based on aggregate function calculations (e.g. HAVING COUNT(*) > 5)." },
          { question: "What is the primary difference between UNION and UNION ALL?", options: ["UNION ALL is slower.", "UNION removes duplicate rows between query sets, while UNION ALL retains all rows including duplicates and executes significantly faster.", "UNION only works on numbers.", "There is no difference."], correct: 1, explanation: "UNION performs an expensive de-duplication sorting operation across query sets; UNION ALL simply appends results together without de-duplicating." },
          { question: "Which window function assigns unique, contiguous integers (1, 2, 3...) to rows without skipping numbers or creating duplicates on ties?", options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "NTILE()"], correct: 2, explanation: "ROW_NUMBER() guarantees strictly unique, sequential integers regardless of ties." },
          { question: "What happens when you execute a query containing a LEFT JOIN and filter `WHERE right_table.amount > 500`?", options: ["It functions as a standard LEFT JOIN.", "It unintentionally converts the LEFT JOIN into an INNER JOIN, discarding unmatched left-table rows because NULL > 500 evaluates to UNKNOWN.", "It generates a syntax error.", "It duplicates the left table rows."], correct: 1, explanation: "Filtering right-side columns in the WHERE clause removes the NULLs generated for unmatched left rows, converting the query into an INNER JOIN." },
          { question: "What function truncates a timestamp to the first day of its calendar quarter in PostgreSQL?", options: ["DATE_TRUNC('quarter', timestamp)", "TRUNC_QUARTER(timestamp)", "QUARTER(timestamp)", "EXTRACT(QUARTER FROM timestamp)"], correct: 0, explanation: "DATE_TRUNC('quarter', timestamp) resets the timestamp to the start of its quarter (Jan 1, Apr 1, Jul 1, Oct 1)." }
        ],
        scenarios: [
          { question: "How do you explain the difference between a Junior BA who writes SQL queries vs a Senior Business Analyst who leverages SQL?", solution: "A Junior BA writes queries to pull raw data when requested. A Senior BA structures queries to test business hypotheses, builds automated KPI pipelines that isolate root causes, and translates complex query output into strategic recommendations for leadership." },
          { question: "Why is writing `SELECT DISTINCT` often used as a dangerous 'band-aid' for poorly constructed joins?", solution: "If a join condition produces duplicate rows (e.g. joining on a non-unique column or many-to-many relationship), junior analysts often slap on SELECT DISTINCT to hide the duplicate rows. This masks the underlying join flaw, hides double-counted financial metrics, and consumes heavy memory." },
          { question: "How will your SQL mastery in Phase 2 accelerate your Power BI modeling in Phase 3?", solution: "Power BI's core concepts map directly to SQL: Power Query steps are equivalent to SQL transformations; Data Modeling (1-to-many relationships) is relational schema design; DAX measures like CALCULATE and SUMX are equivalent to SQL aggregate and window functions." }
        ],
        miniAssignment: "Review all Phase 2 concepts, verify your SQL query scripts are formatted and saved, and prepare your learning workspace for Phase 3: Power BI."
      }
    },

    // DAY 26
    {
      day: 26, phase: "Power BI", phaseId: 2,
      title: "Power BI Ecosystem, Architecture & Desktop Interface",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Understand the end-to-end Power BI architecture: Power BI Desktop, Power BI Service (Cloud), and Mobile Apps.",
        "Master the three primary views in Power BI Desktop: Report View (Canvas), Data View (Tables), and Model View (Schema).",
        "Understand the typical Business Intelligence workflow: Extract/Transform (Power Query) -> Model & Measure (DAX) -> Visualize & Share (Reports).",
        "Set up a local Windows workspace for Power BI development and configure report canvas settings."
      ],
      prerequisites: "Phase 1 & 2 spreadsheet hygiene and relational database concepts.",
      expectedOutcome: "Clear navigation of the Power BI Desktop environment, configuring page aspect ratios, visual panes, and preparing for dataset ingestion.",
      topics: [
        {
          concept: "Power BI Architecture & Component Workflow",
          what: "Power BI Desktop is a free Windows application used to author data models and interactive reports. Power BI Service is the cloud SaaS platform used to publish, schedule data refreshes, and share dashboards with executive stakeholders.",
          why: "In enterprise analytics, analysts build locally in Desktop and distribute via Service workspaces with Row-Level Security (RLS).",
          how: "Workflow: 1) Get Data -> 2) Transform in Power Query -> 3) Build Star Schema in Model View -> 4) Author DAX Measures -> 5) Design Visual Canvas.",
          example: "Building a report locally in `.pbix` format, then publishing to the corporate Power BI workspace.",
          businessCase: "Providing executive leadership with automated, daily-refreshed operational dashboards without manual Excel reporting.",
          pitfalls: "Treating Power BI like 'fancy Excel' by attempting to write hundreds of individual cell-level calculations instead of column-level and model-level measures."
        },
        {
          concept: "The Three Primary Views: Report, Data & Model",
          what: "Report View is the visual presentation canvas; Data View lets you inspect rows and columns of ingested tables; Model View lets you manage relationships and table schemas.",
          why: "Understanding where each task lives is essential: data cleaning belongs in Power Query, schema linking belongs in Model View, and visuals belong in Report View.",
          how: "Switch views using the left navigation icons (Bar Chart icon = Report, Grid icon = Data, Schema Diagram icon = Model).",
          example: "Verifying that foreign key linkages exist between Dim_User and Fact_Transactions in Model View before building charts.",
          businessCase: "Auditing incoming transaction feeds to ensure data types (decimals, dates) were mapped correctly during import.",
          pitfalls: "Building visuals in Report View before establishing clean relationships in Model View, causing charts to display flat, identical numbers across all categories."
        }
      ],
      resources: [
        { title: "Power BI Desktop Beginner Tutorial & Interface Tour", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started", time: "30 mins", covers: "Official Microsoft tour of Desktop views, ribbon, and panes." },
        { title: "Power BI for Beginners (The Complete 2024 Course)", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+BI+Full+Course+Beginner", time: "40 mins", covers: "Interface overview, connecting data, and building your first visual." },
        { title: "Power BI Desktop Architectural Best Practices", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Power+BI+Beginner+Mistakes+to+Avoid", time: "20 mins", covers: "Avoid rookie mistakes in model design and report setup." }
      ],
      timetable: [
        { time: "15 mins", activity: "Phase 3 Orientation: Map SQL schemas and Excel tables to Power BI data models." },
        { time: "50 mins", activity: "Concept Study: Study Power BI architecture, Desktop views, and end-to-end BI workflow." },
        { time: "25 mins", activity: "Interface Exploration: Navigate Report, Data, and Model views; configure canvas settings." },
        { time: "30 mins", activity: "Guided Hands-on: Load a small sample CSV and inspect table structures in Data View." },
        { time: "40 mins", activity: "Practical Business Assignment: Configure project workspace and document BI governance rules." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 26 assessment questions." }
      ],
      exercises: [
        {
          title: "Configure Report Canvas Aspect Ratio and Grid Settings",
          problem: "In Power BI Desktop, set up a standardized 16:9 widescreen canvas with grid alignment and snapping enabled.",
          scenario: "Standardizing reporting templates for enterprise 1080p executive monitors.",
          instructions: "1. Open Power BI Desktop.\n2. In Report View, click canvas background.\n3. Format pane > Canvas settings > Type: 16:9.\n4. View tab > Check 'Snap to grid' and 'Lock objects'.",
          expectedOutput: "Configured 16:9 canvas with object snapping enabled.",
          hint: "Format pane > Canvas settings > Type: 16:9",
          solution: "Canvas settings configured to 16:9 widescreen with Snap to Grid active in the View ribbon."
        },
        {
          title: "Inspect Column Data Types in Data View",
          problem: "Load a sample customer dataset and inspect data types in Data View, verifying that IDs are stored as Text and amounts as Fixed Decimal.",
          scenario: "Validating data cleanliness before building visualizations.",
          instructions: "1. Switch to Data View (middle icon on left).\n2. Select customer_id column > Column tools tab > Verify Data type is 'Text'.\n3. Select amount column > Data type: 'Fixed decimal number' with 2 decimals.",
          expectedOutput: "Columns properly typed in Data View.",
          hint: "Column tools tab > Data type dropdown.",
          solution: "Customer IDs formatted as Text; amounts formatted as Fixed Decimal with $ or ₹ symbol."
        },
        {
          title: "Review Model Relationships in Model View",
          problem: "Switch to Model View and verify the graphical diagram layout.",
          scenario: "Preparing for multi-table dimensional modeling.",
          instructions: "1. Click Model View (bottom icon on left).\n2. Arrange tables with Fact table in center and Dimension tables above it (Waterfall layout).\n3. Observe table properties pane.",
          expectedOutput: "Clean visual layout in Model View.",
          hint: "Model View icon on far left navigation bar.",
          solution: "Model View arranged with clear separation of Fact and Dimension tables."
        }
      ],
      assignment: {
        title: "Power BI Project Workspace Setup & Governance Document",
        scenario: "Prepare the foundational environment for the upcoming 14-day Power BI analytics phase.",
        deliverable: "1. Verify Power BI Desktop installation on your Windows machine (or cloud workspace).\n2. Create a new `.pbix` file named `FinTech_Operations_Dashboard.pbix`.\n3. Configure default page settings: 16:9 widescreen, custom dark theme canvas background (#0b1220).\n4. Write a 1-page document outlining the 3-step BI delivery pipeline: Power Query ETL -> Star Schema DAX -> Executive Visuals.",
        completionCriteria: "Initialized `.pbix` project file saved locally with configured canvas and documented governance."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary difference between Power BI Desktop and Power BI Service?", options: ["Desktop is for Mac; Service is for Windows.", "Desktop is a local authoring tool for developing models and reports; Service is a cloud platform for sharing, publishing, and scheduling automated refreshes.", "Desktop requires coding in C++; Service requires Python.", "There is no difference."], correct: 1, explanation: "Power BI Desktop is the local authoring environment; Power BI Service is the cloud SaaS platform used for enterprise collaboration, sharing, and scheduled data gateway refreshes." },
          { question: "Which view in Power BI Desktop is used to create and manage relationships between different tables?", options: ["Report View", "Data View", "Model View", "Transform View"], correct: 2, explanation: "Model View displays the Entity-Relationship diagram where relationships, cardinalities, and cross-filter directions are managed." },
          { question: "What file extension is used for Power BI Desktop project workbooks?", options: [".xlsx", ".pbix", ".pbit", ".dax"], correct: 1, explanation: "Power BI Desktop saves report files with the `.pbix` extension." },
          { question: "Why should you avoid creating cell-by-cell calculations in Power BI like you would in Excel?", options: ["Power BI does not support math.", "Power BI is a columnar, model-driven business intelligence engine; calculations are evaluated dynamically across tables and filter contexts via DAX measures, not static cell coordinates.", "It makes the file black and white.", "Excel is faster."], correct: 1, explanation: "Power BI uses a columnar database engine (VertiPaq) designed for model-level relationships and dynamic DAX aggregations, not coordinate-based cells." },
          { question: "Where do data extraction, column splitting, and type transformation take place before data is loaded into the data model?", options: ["In the DAX formula bar", "In Power Query Editor", "In the Format pane", "In Excel"], correct: 1, explanation: "Power Query Editor is the dedicated ETL (Extract, Transform, Load) engine inside Power BI." }
        ],
        scenarios: [
          { question: "Why should you never build reports by directly importing one massive 100-column flat Excel spreadsheet into Power BI?", solution: "Massive flat tables waste memory, slow down the VertiPaq compression engine, create confusing visual fields, and make writing DAX measures exponentially more complex. Splitting data into a Star Schema (Fact table + Dimension tables) optimizes compression, performance, and simplicity." },
          { question: "How does Power BI Desktop handle offline work versus cloud publishing?", solution: "Power BI Desktop works completely offline with cached local data. Once a report is complete, clicking 'Publish' uploads the model to the cloud Power BI Service, where enterprise users can view it in web browsers or mobile apps." },
          { question: "What is the role of the On-Premises Data Gateway in Power BI enterprise architecture?", solution: "When a company hosts databases on internal local servers, the On-Premises Data Gateway acts as a secure encrypted bridge, allowing the cloud Power BI Service to connect and automatically refresh dashboard data on a schedule without opening internal firewall ports." }
        ],
        miniAssignment: "Launch Power BI Desktop, open the Options and Settings menu, and verify regional locale settings are set to match your currency format."
      }
    },

    // DAY 27
    {
      day: 27, phase: "Power BI", phaseId: 2,
      title: "Data Extraction & Multiple Source Connectors (CSV, Excel, Web, SQL)",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Connect to diverse data sources: CSV files, Excel workbooks, SQL Server/PostgreSQL databases, and web APIs.",
        "Understand the fundamental architectural difference between Import Mode and DirectQuery Mode.",
        "Ingest the core FinTech project datasets: `users.csv`, `transactions.csv`, `mutual_funds.xlsx`, and `gateways.csv`.",
        "Understand scheduled data refresh concepts and cache memory storage in the VertiPaq engine."
      ],
      prerequisites: "Day 26 Power BI interface basics.",
      expectedOutcome: "Successfully connected and imported multi-source datasets into Power Query, understanding storage modes and refresh trade-offs.",
      topics: [
        {
          concept: "Import Mode vs DirectQuery Mode",
          what: "Import Mode loads a snapshot copy of data into Power BI's in-memory VertiPaq columnar database. DirectQuery leaves data in the source database, querying it live on every visual interaction.",
          why: "Import Mode delivers lightning-fast sub-second DAX calculations and offline flexibility, but requires scheduled data refreshes. DirectQuery provides real-time data but is slower and limits DAX function availability.",
          how: "Select 'Import' (recommended for 95% of business analytics) during data connector setup.",
          example: "Importing 100,000 transactions into memory consumes only ~15 MB RAM due to columnar compression.",
          businessCase: "Choosing Import Mode for daily operational dashboards where sub-second filter responsiveness is required by executive leadership.",
          pitfalls: "Choosing DirectQuery unnecessarily, resulting in sluggish visual rendering and restricted DAX time-intelligence functions."
        },
        {
          concept: "Connecting to Multiple Heterogeneous Sources",
          what: "Power BI can seamlessly merge data coming from completely different physical sources (e.g. transactions from a PostgreSQL database, targets from an Excel sheet, and exchange rates from a Web API).",
          why: "In real business environments, operational data is fragmented across databases, spreadsheets, and third-party SaaS tools.",
          how: "Home > Get Data > Select connector (Excel, Text/CSV, PostgreSQL, Web) > Provide credentials > Click 'Transform Data'.",
          example: "Joining PostgreSQL transactional records with an Excel budget target sheet authored by the finance director.",
          businessCase: "Reconciling live payment gateway settlement tables with an offline commission rate spreadsheet.",
          pitfalls: "Clicking 'Load' immediately instead of 'Transform Data', skipping crucial data hygiene checks in Power Query."
        }
      ],
      resources: [
        { title: "Connect to Data Sources in Power BI Desktop", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-connect-to-data", time: "25 mins", covers: "Official documentation on data connectors and import settings." },
        { title: "Import Mode vs DirectQuery vs Composite Models Explained", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Import+vs+DirectQuery+Power+BI", time: "20 mins", covers: "Performance differences, storage trade-offs, and best practices." },
        { title: "Importing Excel and CSV Data into Power BI Step-by-Step", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+BI+Import+Data+Excel+CSV", time: "25 mins", covers: "Connecting files, navigation, and loading into Power Query." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 26 Desktop interface and views." },
        { time: "50 mins", activity: "Concept Study: Study Import vs DirectQuery, data connectors, and VertiPaq memory caching." },
        { time: "25 mins", activity: "Hands-on Ingestion: Connect to sample CSV and Excel datasets." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 data connection challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Ingest the 4 core FinTech project source files." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 27 assessment questions." }
      ],
      exercises: [
        {
          title: "Connect to Multi-File CSV and Excel Sources",
          problem: "Connect to `users.csv` and `mutual_funds.xlsx` using Get Data. Ensure you click 'Transform Data' rather than 'Load'.",
          scenario: "Initializing project data pipeline.",
          instructions: "1. Home > Get Data > Text/CSV > Select users.csv.\n2. In preview dialog, click 'Transform Data'.\n3. Inside Power Query, Home > New Source > Excel Workbook > Select mutual_funds.xlsx.",
          expectedOutput: "Both tables visible in the Power Query Queries pane.",
          hint: "Always click 'Transform Data' to review schemas first.",
          solution: "Both data sources successfully loaded into Power Query Editor."
        },
        {
          title: "Inspect and Configure Ingestion File Paths",
          problem: "Check the source file path in Power Query and parameterize it so moving the project folder doesn't break connections.",
          scenario: "Building portable BI project files that work across team machines.",
          instructions: "1. In Power Query, select query > Applied Steps > Source step gear icon.\n2. Verify file path.\n3. Create a parameter `DataFolderPath` for portable path resolution.",
          expectedOutput: "Configured data source with clean parameter references.",
          hint: "Home tab > Manage Parameters > New Parameter.",
          solution: "Data source file paths verified and linked to parameter."
        },
        {
          title: "Web Data Connector Ingestion",
          problem: "Use the Web connector to ingest an exchange rate table or public RBI holiday list from a web URL.",
          scenario: "Enriching transaction data with official banking calendar holidays.",
          instructions: "1. Get Data > Web.\n2. Enter URL > Select suggested table from web page.\n3. Load into Power Query.",
          expectedOutput: "Clean web-sourced reference table in Power Query.",
          hint: "Get Data > Web > Paste URL > Select HTML table.",
          solution: "Web table successfully extracted and parsed by Power Query."
        }
      ],
      assignment: {
        title: "FinTech Analytics Multi-Source Ingestion Pipeline",
        scenario: "Ingest the 4 core project tables representing the investment platform's operations.",
        deliverable: "1. Ingest `dim_users` (CSV): User_ID, Name, Email, State, KYC_Status, Created_At.\n2. Ingest `dim_mutual_funds` (Excel): Fund_ID, Fund_Name, Category, Expense_Ratio, AMC.\n3. Ingest `dim_gateways` (CSV): Gateway_ID, Gateway_Name, MDR_Rate, Tech_Error_SLA.\n4. Ingest `fact_transactions` (CSV): Txn_ID, User_ID, Fund_ID, Gateway_ID, Amount, Status, Created_At.\n5. Confirm all 4 queries appear in Power Query Editor with Import storage mode.",
        completionCriteria: "All 4 tables successfully connected in Import mode with zero connection errors."
      },
      assessment: {
        mcqs: [
          { question: "Why should you almost always click 'Transform Data' instead of 'Load' when connecting to a data source?", options: ["'Load' deletes the source file.", "'Transform Data' opens Power Query Editor, allowing you to verify data types, remove dirty rows, and ensure hygiene before data enters the model.", "'Transform Data' is required by law.", "'Load' cannot import more than 10 rows."], correct: 1, explanation: "Clicking 'Transform Data' opens Power Query, giving you the critical opportunity to inspect data types, clean headers, and filter rows before loading into the analytical model." },
          { question: "What is the primary benefit of Import Mode in Power BI?", options: ["It does not require any memory.", "Data is compressed into the in-memory VertiPaq engine, delivering blazing-fast DAX calculation performance and rich modeling capabilities.", "It updates the source database automatically.", "It works without an operating system."], correct: 1, explanation: "Import Mode compresses data into RAM using the VertiPaq engine, enabling sub-second analytical queries and the full suite of DAX functions." },
          { question: "When is DirectQuery mode typically necessary?", options: ["When working with small Excel sheets.", "When data volume is in the hundreds of gigabytes/terabytes and cannot fit into local memory, or when strict real-time live queries are mandated by compliance.", "When you want reports to run faster.", "When using Mac."], correct: 1, explanation: "DirectQuery is required for massive big-data warehouses exceeding memory limits or when real-time second-by-second live updates are non-negotiable." },
          { question: "Can a single Power BI report combine data from an Excel file and an SQL database simultaneously?", options: ["No, Power BI only allows one data source per report.", "Yes, Power BI is designed to connect to multiple heterogeneous data sources and link them in a unified data model.", "Only in Power BI Service.", "Only if using Python scripts."], correct: 1, explanation: "Power BI seamlessly blends data from diverse sources into a single unified relational model." },
          { question: "What happens to your report visuals in Import Mode if the underlying source Excel file is modified?", options: ["Visuals update instantaneously in real-time.", "Visuals do not update until you click 'Refresh' in Power BI to pull a new snapshot of the data.", "The file crashes.", "Power BI deletes the changes."], correct: 1, explanation: "Import Mode holds an in-memory snapshot; to incorporate updates from the source file, you must trigger a data refresh." }
        ],
        scenarios: [
          { question: "A company has 20 million historical transactions stored in a cloud data warehouse and 5,000 new transactions added daily. Should they use Import Mode or DirectQuery?", solution: "They should consider Composite Mode (Hybrid): aggregate historical data or use an Incremental Refresh policy in Import Mode (importing historical data once and refreshing only recent days), or DirectQuery for real-time transactions combined with Import for dimension tables. Pure Import with Incremental Refresh is usually fastest." },
          { question: "Why is it dangerous to connect Power BI directly to production transactional SQL databases (OLTP) without using a read-replica or data warehouse?", solution: "Analytical queries generate heavy aggregations and table scans. Running these directly against the live production banking database can lock tables, slow down customer mobile app checkouts, or cause transaction timeouts." },
          { question: "What happens if a column name in the source Excel file is renamed after you have already built Power Query steps?", solution: "Power Query will fail at the first step that references the old column name with an error: 'The column \"Old_Name\" of the table wasn't found'. You must update the step in the Advanced Editor to reflect the new column name." }
        ],
        miniAssignment: "Create a new Power BI file, use Get Data to connect to any public CSV, and inspect the navigation preview window."
      }
    },

    // DAY 28 (Weekly Assessment 4)
    {
      day: 28, phase: "Power BI", phaseId: 2,
      title: "Data Transformation in Power Query (ETL) [Weekly Assessment 4]",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master Power Query Editor (M language): Applied Steps, query dependency, and formula bar.",
        "Perform core ETL transformations: Promote Headers, Change Data Types, Replace Values, Remove Blanks, and Split Columns.",
        "Execute advanced transformations: Unpivot Columns (converting wide crosstabs to normalized tall rows).",
        "Merge Queries (relational joins in Power Query) and Append Queries (stacking tables vertically).",
        "Synthesize Weeks 1–4 competencies in the comprehensive Weekly Assessment 4."
      ],
      prerequisites: "Day 27 data connectors and ingestion.",
      expectedOutcome: "The ability to sanitize, reshape, unpivot, and merge raw operational tables into pristine, normalized dimensional models ready for DAX.",
      topics: [
        {
          concept: "Power Query Applied Steps & Transformation Hygiene",
          what: "Power Query records every cleaning transformation as an immutable step in the 'Applied Steps' pane, authored in the M language.",
          why: "When tomorrow's new transaction file arrives, clicking 'Refresh' replays all 20 cleaning steps automatically, saving hours of manual Excel cleaning.",
          how: "Transform > Use First Row as Headers; Right-click column > Change Type; Transform > Replace Values.",
          example: "Applied Steps: Source -> Promoted Headers -> Changed Type -> Filtered Rows -> Capitalized Each Word.",
          businessCase: "Automating the daily 8:00 AM data preparation pipeline for FinTech settlement reconciliation.",
          pitfalls: "Re-ordering Applied Steps blindly, causing downstream steps to reference deleted or renamed columns."
        },
        {
          concept: "Unpivoting Columns: Wide vs Tall Data",
          what: "Converting wide spreadsheet layouts (where each month or gateway is a separate column) into tall, normalized tables (Attribute and Value columns).",
          why: "Power BI cannot aggregate across multiple columns effectively. It requires tall normalized datasets where dates/categories live in a single column.",
          how: "Select ID columns > Right-click > 'Unpivot Other Columns' > Rename 'Attribute' to Month and 'Value' to Amount.",
          example: "Converting a 12-column table (Jan_Sales, Feb_Sales...) into two columns: Month and Sales.",
          businessCase: "Normalizing monthly bank commission settlement sheets provided by financial institutions.",
          pitfalls: "Hardcoding column unpivots by selecting the monthly columns directly instead of using 'Unpivot Other Columns' (which dynamically accommodates new future months)."
        }
      ],
      resources: [
        { title: "Power Query Editor Full Masterclass for Beginners", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+Query+Beginner+Tutorial", time: "35 mins", covers: "Applied Steps, data types, cleaning, and replacing values." },
        { title: "Unpivot Columns in Power BI (The Most Important ETL Step)", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Unpivot+Columns+Power+BI", time: "20 mins", covers: "Wide vs tall data, Unpivot Other Columns, and dynamic schema adaptation." },
        { title: "Merge vs Append Queries in Power Query", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-common-query-tasks", time: "25 mins", covers: "Official guide on joins and table appending in Power Query." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 27 data connections and Import mode." },
        { time: "50 mins", activity: "Concept Study: Study Power Query interface, Applied Steps, Unpivoting, and Merge/Append." },
        { time: "25 mins", activity: "Guided Practice: Replicate Unpivoting wide data and Merging gateway metadata." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 Power Query transformation challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Complete Weekly Assessment 4 ETL Pipeline." },
        { time: "20 mins", activity: "Quiz & Review: Complete Weekly Assessment 4 assessment questions." }
      ],
      exercises: [
        {
          title: "Normalize Wide Financial Settlement Sheet with Unpivot",
          problem: "Transform a wide 12-month budget table (Fund_Name, Jan, Feb, Mar...) into a normalized 3-column table (Fund_Name, Month, Target_Amount).",
          scenario: "Preparing budget targets to join with actual transactional inflows.",
          instructions: "1. Select Fund_Name column.\n2. Right-click > 'Unpivot Other Columns'.\n3. Rename 'Attribute' to 'Month' and 'Value' to 'Target_Amount'.\n4. Format Target_Amount as Decimal.",
          expectedOutput: "Tall, normalized table with 3 columns.",
          hint: "Right-click the non-month columns and choose 'Unpivot Other Columns'.",
          solution: "Wide monthly columns successfully transformed into normalized Month and Target_Amount columns."
        },
        {
          title: "Merge Queries: Enrich Transactions with Bank Master Data",
          problem: "In Power Query, merge `fact_transactions` with `dim_gateways` on Gateway_ID using a Left Outer join to pull Gateway_Name and SLA.",
          scenario: "Enriching raw operational transactions with vendor metadata.",
          instructions: "1. Home > Merge Queries.\n2. Select fact_transactions and dim_gateways.\n3. Click Gateway_ID in both tables.\n4. Join kind: Left Outer.\n5. Expand only Gateway_Name and Tech_Error_SLA.",
          expectedOutput: "Enriched fact table with vendor columns.",
          hint: "Merge Queries > Match ID column > Expand required fields.",
          solution: "Transactions table successfully merged with Gateway metadata without duplicate rows."
        },
        {
          title: "Append Queries: Combine Q1, Q2, and Q3 Transaction Batches",
          problem: "You are given 3 separate monthly transaction CSV files with identical schemas. Stack them into a single unified table.",
          scenario: "Consolidating quarterly data exports into a master historical transaction ledger.",
          instructions: "1. Home > Append Queries as New.\n2. Select 'Three or more tables'.\n3. Add Q1_Txns, Q2_Txns, Q3_Txns.\n4. Rename new query to `All_Transactions`.",
          expectedOutput: "Single combined query containing rows from all three tables.",
          hint: "Append Queries stacks tables vertically (like UNION ALL in SQL).",
          solution: "Three quarterly files combined into a single continuous transaction dataset."
        }
      ],
      assignment: {
        title: "Weekly Assessment 4: Comprehensive FinTech ETL Sanitization Pipeline",
        scenario: "Clean and prepare the raw FinTech project tables in Power Query, building a repeatable automated pipeline.",
        deliverable: "Execute the following in Power Query:\n1. `dim_users`: Strip leading/trailing spaces from names; format Phone as Text; extract Registration Year from Created_At.\n2. `dim_mutual_funds`: Replace null Expense_Ratio values with 0.00; format AMC as Proper Case.\n3. `fact_transactions`: Remove rows with negative amounts (test refunds); filter out internal sandbox test accounts (`user_id = 99999`); format timestamps as DateTime.\n4. Unpivot the quarterly gateway fee matrix into a clean normalized structure.\n5. Close & Apply changes to load cleaned tables into the data model.",
        completionCriteria: "All Applied Steps cleanly named, zero errors in column quality profiling, and tables loaded into the model."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary difference between 'Merge Queries' and 'Append Queries' in Power Query?", options: ["Merge combines tables horizontally based on matching keys (like an SQL JOIN); Append stacks tables vertically (like an SQL UNION).", "Merge deletes duplicate rows; Append adds new columns.", "Append is for numbers; Merge is for text.", "They are identical."], correct: 0, explanation: "Merge joins columns horizontally based on a shared key; Append stacks rows vertically from tables with identical column schemas." },
          { question: "Why is selecting 'Unpivot Other Columns' better than selecting the specific columns and choosing 'Unpivot Columns'?", options: ["It is faster to type.", "It is dynamic: if next month's data introduces a new column (e.g. 'Dec_Sales'), 'Unpivot Other Columns' automatically includes it without breaking the query.", "It uses less RAM.", "It works only on Mac."], correct: 1, explanation: "Selecting static columns hardcodes their names. Selecting the unchanging anchor column and choosing 'Unpivot Other Columns' ensures future new columns are dynamically absorbed." },
          { question: "Where can you inspect and edit the underlying M code generated by Power Query steps?", options: ["In the DAX formula bar", "In the Advanced Editor (Home tab > Advanced Editor)", "In the Excel ribbon", "In the Windows Registry"], correct: 1, explanation: "The Advanced Editor displays the full M-language script defining all extraction, transformation, and load steps." },
          { question: "What happens to dirty data transformations when new data is refreshed tomorrow in Power BI?", options: ["You must manually redo all cleaning steps.", "Power Query automatically replays every step in the 'Applied Steps' list in sequence against the new data.", "Power Query skips cleaning on refresh.", "Power BI prompts you to pay for a license."], correct: 1, explanation: "Applied Steps act as an automated macro pipeline, applying your exact transformations to every subsequent data refresh." },
          { question: "What feature in Power Query shows the percentage of valid, error, and empty values in each column?", options: ["Column Quality (View tab > Column Quality)", "Data Validator", "Error Scanner", "Audit View"], correct: 0, explanation: "Enabling 'Column Quality' under the View tab displays visual bars indicating Valid, Error, and Empty percentages for every column." }
        ],
        scenarios: [
          { question: "A raw transaction file has columns 'Date', 'Time', and 'Timezone'. How should you handle this in Power Query for analytical time series modeling?", solution: "Combine Date and Time into a single DateTime column (or use Transform > Merge Columns with a space delimiter, then set type to DateTime). For dimensional modeling, keep a separate pure Date column to link to your Dim_Date table, and keep Time only if granular intra-day hour analysis is needed." },
          { question: "Why should you uncheck 'Enable Load' for staging and intermediate queries in Power Query?", solution: "Right-clicking an intermediate query and unchecking 'Enable Load' keeps it in memory during ETL processing but prevents it from duplicating data in the final Power BI data model. This saves significant RAM and prevents visual confusion." },
          { question: "How does Power Query handle 'Query Folding', and why is it crucial for database performance?", solution: "Query Folding is the process where Power Query converts your GUI transformation steps (like filters, joins, and column removals) back into native SQL queries executed directly on the source database server. This leverages the database engine's speed and minimizes the data transferred across the network." }
        ],
        miniAssignment: "In Power Query, create a custom column named 'Transaction_Band' using an M expression: if [Amount] >= 10000 then 'High' else 'Standard'."
      }
    },

    // DAY 29
    {
      day: 29, phase: "Power BI", phaseId: 2,
      title: "Data Relationships, Cardinality & Cross-Filtering Direction",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master relational modeling in Model View: Primary Key to Foreign Key linking.",
        "Understand Cardinalities: One-to-Many (1:*), Many-to-One (*:1), and One-to-One (1:1).",
        "Diagnose and eliminate dangerous Many-to-Many (*:*) relationship traps.",
        "Master Cross-Filter Direction: Single direction vs Both (bidirectional cross-filtering) and understand performance risks."
      ],
      prerequisites: "Day 28 Power Query ETL and Phase 2 relational schema knowledge.",
      expectedOutcome: "A robust, ambiguity-free relational model in Model View with verified 1-to-Many relationships and single cross-filter directions.",
      topics: [
        {
          concept: "Relationship Cardinality (1-to-Many vs Many-to-Many)",
          what: "Cardinality defines the numerical relationship between rows in two tables. 1-to-Many (1:*) means each row in the Dimension table exists once, but can appear multiple times in the Fact table.",
          why: "1-to-Many is the gold standard of data modeling. Many-to-Many (*:*) introduces data ambiguity, produces unexpected cartesian inflations, and severely degrades DAX performance.",
          how: "Drag Primary Key from Dimension table (e.g. `dim_users[user_id]`) to Foreign Key in Fact table (`fact_transactions[user_id]`). Verify the '1' is on the Dimension side and '*' is on the Fact side.",
          example: "One user can make many transactions; one mutual fund can have many SIP subscriptions.",
          businessCase: "Ensuring that filtering by Customer State correctly filters transaction volumes without double-counting.",
          pitfalls: "Leaving duplicates in a Dimension table's key column, which forces Power BI to default to a dangerous Many-to-Many relationship."
        },
        {
          concept: "Cross-Filter Direction: Single vs Both",
          what: "Cross-filter direction controls how filter context flows between tables. In Single direction, filters flow from the '1' side (Dimension) to the '*' side (Fact). 'Both' allows filters to flow bidirectionally.",
          why: "Bidirectional filtering can cause circular relationship paths, unexpected visual filtering, and severe performance degradation in enterprise models.",
          how: "Double-click relationship line > Set Cross filter direction to 'Single' (default and recommended). Use DAX `CROSSFILTER()` if bidirectional filtering is temporarily needed for a specific measure.",
          example: "Selecting a Mutual Fund filters the Transactions table. In Single direction, selecting a Transaction does NOT filter the Mutual Funds table.",
          businessCase: "Maintaining clean filter hierarchy across customer demographics and product portfolios.",
          pitfalls: "Setting all relationships to 'Both' indiscriminately as a quick fix for incorrect visual filtering."
        }
      ],
      resources: [
        { title: "Model Relationships in Power BI Desktop Official Guide", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships", time: "25 mins", covers: "Creating relationships, cardinalities, and active vs inactive links." },
        { title: "Relationship Cardinality & Cross-Filter Direction Deep Dive", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Power+BI+Relationships+Cardinality+Cross+Filter", time: "25 mins", covers: "1-to-Many, Many-to-Many dangers, and bidirectional filtering risks." },
        { title: "Star Schema Modeling & Relationship Design", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+BI+Data+Modeling+Relationships", time: "30 mins", covers: "Connecting dimensions to fact tables in Model View." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 28 Power Query ETL and table hygiene." },
        { time: "50 mins", activity: "Concept Study: Study Cardinalities (1:*, *:*, 1:1), filter flow direction, and Model View design." },
        { time: "25 mins", activity: "Guided Practice: Establish 1-to-Many relationships across FinTech project tables." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 relationship modeling challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build and Validate FinTech Multi-Table Relationship Model." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 29 assessment questions." }
      ],
      exercises: [
        {
          title: "Establish 1-to-Many Relationship Between Users and Transactions",
          problem: "In Model View, connect `dim_users` to `fact_transactions` on `user_id`. Verify cardinality is 1-to-Many (1:*).",
          scenario: "Enabling customer demographic slicing across investment metrics.",
          instructions: "1. Switch to Model View.\n2. Drag `dim_users[user_id]` onto `fact_transactions[user_id]`.\n3. Verify relationship line displays '1' at dim_users and '*' at fact_transactions.\n4. Confirm Cross filter direction is 'Single'.",
          expectedOutput: "Active 1:* relationship line linking users to transactions.",
          hint: "Drag key from Dimension table to Fact table.",
          solution: "Relationship established with 1 on dim_users and * on fact_transactions."
        },
        {
          title: "Resolve Accidental Many-to-Many Relationship Trap",
          problem: "When connecting `dim_mutual_funds` to `fact_transactions` on `fund_id`, Power BI warns: 'This relationship has cardinality Many-to-Many'. Diagnose and fix.",
          scenario: "Identifying and removing duplicate scheme IDs in the product catalog.",
          instructions: "1. Open Power Query.\n2. In `dim_mutual_funds`, inspect fund_id for duplicates.\n3. Remove duplicate rows on fund_id.\n4. Close & Apply. Re-establish relationship as 1-to-Many.",
          expectedOutput: "Clean 1-to-Many relationship replacing the ambiguous Many-to-Many link.",
          hint: "A dimension table's primary key must contain strictly unique values.",
          solution: "Duplicates removed in Power Query, allowing clean 1:* cardinality."
        },
        {
          title: "Configure Inactive Relationship for Multi-Date Analysis",
          problem: "A transaction has two dates: `created_at` (order placed) and `settled_at` (bank settlement). Connect both to `dim_date`.",
          scenario: "Reporting transactions by order date vs settlement date.",
          instructions: "1. Link `created_at` to `dim_date[Date]` (Active relationship - solid line).\n2. Link `settled_at` to `dim_date[Date]` (Inactive relationship - dashed line).\n3. Understand how DAX `USERELATIONSHIP()` activates the dashed line on demand.",
          expectedOutput: "One solid active relationship and one dashed inactive relationship.",
          hint: "Power BI only permits one active relationship between two tables at a time.",
          solution: "Primary date active (solid line), secondary settlement date inactive (dashed line)."
        }
      ],
      assignment: {
        title: "FinTech Star Schema Relational Model Assembly",
        scenario: "Complete the core data model linking all 4 ingested project tables in Power BI Desktop Model View.",
        deliverable: "1. Link `dim_users` (1) to `fact_transactions` (*) on `user_id`.\n2. Link `dim_mutual_funds` (1) to `fact_transactions` (*) on `fund_id`.\n3. Link `dim_gateways` (1) to `fact_transactions` (*) on `gateway_id`.\n4. Arrange Model View in a clean waterfall layout: Dimension tables across the top row, Fact table centered below them.\n5. Confirm all relationships are Single cross-filter direction with zero Many-to-Many warnings.",
        completionCriteria: "Clean star schema with 3 active 1-to-Many relationships and verified filter propagation."
      },
      assessment: {
        mcqs: [
          { question: "What does the '1' and '*' on a relationship line in Power BI Model View represent?", options: ["1 means primary color; * means accent color.", "1 represents the unique/primary key side (Dimension table); * represents the multiple/foreign key side (Fact table).", "1 means active; * means inactive.", "It indicates table permissions."], correct: 1, explanation: "The '1' indicates the table where each key value is unique (Dimension table); '*' indicates the table where the key can appear multiple times (Fact table)." },
          { question: "Why are Many-to-Many (*:*) relationships generally discouraged in Power BI?", options: ["They make the report black and white.", "They introduce ambiguous filter paths, risk double-counting metrics, and degrade calculation performance.", "They cannot be used with slicers.", "Power BI crashes immediately."], correct: 1, explanation: "Many-to-Many relationships can produce unexpected data inflation and ambiguity. Best practice is to resolve them using an intermediate bridge table or normalizing dimensions." },
          { question: "In what direction does filter context flow by default in a standard 1-to-Many relationship?", options: ["From the Fact table (*) to the Dimension table (1)", "From the Dimension table (1) to the Fact table (*)", "Bidirectionally in both directions", "It does not flow at all."], correct: 1, explanation: "By default (Single direction), filtering a Dimension table (e.g. selecting a State) filters down to the Fact table rows, but filtering the Fact table does not filter the Dimension." },
          { question: "What does a dashed relationship line indicate in Model View?", options: ["A broken relationship.", "An inactive relationship that can only be activated inside specific DAX measures using the USERELATIONSHIP() function.", "A deleted relationship.", "A relationship to an Excel file."], correct: 1, explanation: "A dashed line represents an inactive relationship. Only one active path can exist between two tables; secondary paths remain inactive until invoked via USERELATIONSHIP()." },
          { question: "What happens if a Dimension table contains duplicate values in its key column when creating a relationship?", options: ["Power BI deletes the duplicate rows automatically.", "Power BI refuses a 1-to-Many relationship and defaults to Many-to-Many (*:*).", "Power BI ignores the duplicates.", "The file is locked."], correct: 1, explanation: "If the primary key column contains even a single duplicate value, Power BI cannot create a 1:* relationship and forces a Many-to-Many relationship." }
        ],
        scenarios: [
          { question: "A report shows identical total revenue (₹1.8 Cr) on every single row of a table visual when broken down by Customer State. What is the root cause?", solution: "The relationship between `dim_users` and `fact_transactions` is either missing, inactive, or pointing in the wrong direction. Because filter context cannot flow from `dim_users` to `fact_transactions`, the measure evaluates against the entire unfiltered table on every row." },
          { question: "Why should you avoid enabling 'Both' (bidirectional cross-filtering) globally across all model relationships?", solution: "Bidirectional filtering can create circular relationship loops (ambiguous paths between tables) and causes severe performance bottlenecks because the engine must calculate cross-table filters in both directions for every visual interaction." },
          { question: "How does having a proper Star Schema make writing DAX measures easier compared to a Snowflake schema?", solution: "In a Star Schema, every dimension is directly connected to the fact table by a single hop (1:*). You never have to write complex multi-hop join traversals in DAX, and filter context flows cleanly and predictably directly into the fact table." }
        ],
        miniAssignment: "In Model View, drag a relationship line between two tables, double-click the line to open the Edit Relationship dialog, and inspect the properties."
      }
    },

    // DAY 30
    {
      day: 30, phase: "Power BI", phaseId: 2,
      title: "Star Schema Architecture & Date Dimensions (Dim_Calendar)",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master Kimball Dimensional Modeling principles: Fact tables (measurements, events) vs Dimension tables (context, filters).",
        "Understand Star Schema vs Snowflake Schema: why flat denormalized star dimensions optimize Power BI's VertiPaq engine.",
        "Create a dedicated, robust `Dim_Calendar` table using DAX (`CALENDARAUTO()` or `CALENDAR()`).",
        "Mark table as official Date Table and configure chronological sorting (Sort Month Name by Month Number)."
      ],
      prerequisites: "Day 29 relationships and cardinalities.",
      expectedOutcome: "A certified Star Schema data model featuring an official dedicated Date Dimension table with chronological sorting configured.",
      topics: [
        {
          concept: "Star Schema Architecture (Facts vs Dimensions)",
          what: "A Star Schema organizes data into central Fact tables containing quantitative metrics (amounts, fees, quantities) surrounded by Dimension tables containing descriptive attributes (customer names, dates, fund categories).",
          why: "Power BI's internal VertiPaq engine is explicitly engineered for Star Schemas. Star Schemas maximize memory compression and produce the fastest DAX execution times.",
          how: "Fact table = `Fact_Transactions`; Dimension tables = `Dim_User`, `Dim_Date`, `Dim_MutualFund`, `Dim_Gateway`. Dimensions connect directly to the Fact table.",
          example: "Fact table stores transaction amounts and foreign keys; Dimension tables store full descriptive customer and product metadata.",
          businessCase: "Standard enterprise architecture for FinTech transaction analytics and executive reporting.",
          pitfalls: "Leaving dimension tables chained together in multi-hop Snowflake hierarchies (e.g. Transactions -> Products -> Subcategories -> Categories) instead of flattening them into a single clean Product dimension."
        },
        {
          concept: "The Dedicated Date Dimension (Dim_Calendar)",
          what: "A continuous, contiguous calendar table containing every single date from the earliest transaction to the latest, with zero missing days.",
          why: "Power BI's Time Intelligence functions (YTD, SAMEPERIODLASTYEAR) require an unbroken, contiguous Date table marked as an official Date Table.",
          how: "DAX: `Dim_Calendar = CALENDAR(DATE(2023, 1, 1), DATE(2025, 12, 31))` or `CALENDARAUTO()`. Add columns: Year, Month Number, Month Name, Quarter, Day of Week.",
          example: "Sorting `MonthName` ('January', 'February') by `MonthNumber` (1, 2) so charts sort chronologically rather than alphabetically ('April', 'August').",
          businessCase: "Enabling executive Month-over-Month, Quarter-to-Date, and Year-to-Date financial comparisons.",
          pitfalls: "Relying on Power BI's default hidden 'Auto Date/Time' feature, which bloats `.pbix` file size and breaks advanced Time Intelligence."
        }
      ],
      resources: [
        { title: "Understand Star Schema and the Importance for Power BI", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema", time: "30 mins", covers: "Official Microsoft architectural guidance on Facts, Dimensions, and Star Schemas." },
        { title: "The Ultimate Date Table in Power BI (DAX CalendarAuto)", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Power+BI+Date+Table+CalendarAuto", time: "20 mins", covers: "Generating Dim_Date, adding calendar columns, and Mark as Date Table." },
        { title: "Why You MUST Turn Off Auto Date/Time in Power BI", platform: "Curibal / Avi Singh", url: "https://www.youtube.com/results?search_query=Turn+off+Auto+Date+Time+Power+BI+Guy+in+a+Cube", time: "15 mins", covers: "Disabling bloated hidden date tables for production performance." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 29 relationships and 1-to-Many links." },
        { time: "50 mins", activity: "Concept Study: Study Kimball Star Schema principles, Fact vs Dimension, and Date table requirements." },
        { time: "25 mins", activity: "Guided Hands-on: Author Dim_Calendar using DAX and configure month sorting." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 dimensional modeling challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Disable Auto Date/Time and Connect Master Date Dimension." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 30 assessment questions." }
      ],
      exercises: [
        {
          title: "Disable Power BI Auto Date/Time",
          problem: "Turn off Power BI's default hidden Auto Date/Time setting to optimize model memory and remove bloat.",
          scenario: "Standardizing production reporting governance.",
          instructions: "1. File > Options and settings > Options.\n2. Current File > Data Load > Under Time Intelligence, uncheck 'Auto date/time'.\n3. Click OK.",
          expectedOutput: "Hidden auto date tables removed from the `.pbix` model.",
          hint: "File > Options > Current File > Data Load > Auto date/time.",
          solution: "Auto Date/Time disabled, optimizing memory footprint."
        },
        {
          title: "Create Master Date Dimension Using DAX",
          problem: "Author a calculated Date table covering all dates from 2023-01-01 to 2025-12-31 with Year, Month, MonthNo, and Quarter.",
          scenario: "Building the official calendar dimension.",
          instructions: "1. Modeling tab > New Table.\n2. Write DAX: `Dim_Date = ADDCOLUMNS(CALENDAR(DATE(2023,1,1), DATE(2025,12,31)), \"Year\", YEAR([Date]), \"MonthNo\", MONTH([Date]), \"Month\", FORMAT([Date], \"MMMM\"), \"Quarter\", \"Q\" & FORMAT([Date], \"Q\"))`.\n3. Table tools > Mark as Date Table > Select Date column.",
          expectedOutput: "A complete, verified Date dimension table.",
          hint: "Use ADDCOLUMNS and CALENDAR in Modeling tab.",
          solution: "Dim_Date table created and officially marked as Date Table."
        },
        {
          title: "Configure Chronological Sorting for Month Name",
          problem: "Configure the `Month` column ('January', 'February'...) to sort chronologically by `MonthNo` instead of alphabetically ('April', 'August'...).",
          scenario: "Preventing alphabetical chart axis sorting errors.",
          instructions: "1. In Data View, select `Dim_Date` table.\n2. Click the `Month` column header.\n3. Column tools tab > Click 'Sort by column' > Select `MonthNo`.",
          expectedOutput: "Month column sorted chronologically (Jan, Feb, Mar...).",
          hint: "Column tools tab > Sort by column > MonthNo.",
          solution: "Month column successfully sorted by MonthNo."
        }
      ],
      assignment: {
        title: "Master FinTech Star Schema & Calendar Dimension Assembly",
        scenario: "Complete the formal Star Schema for the FinTech Investment Dashboard.",
        deliverable: "1. Create `Dim_Date` table using DAX with continuous dates matching the transaction window.\n2. Add columns: Year, Month, MonthNo, Quarter, YearMonth (YYYY-MM), DayOfWeek.\n3. Mark as Date Table and set 'Sort by column' on Month to MonthNo.\n4. Link `Dim_Date[Date]` (1) to `Fact_Transactions[Created_At]` (*).\n5. Verify that dragging `Dim_Date[Month]` and `Fact_Transactions[Amount]` into a chart produces a clean chronological trend.",
        completionCriteria: "Star Schema complete with dedicated Date table and chronological monthly visual sorting."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary role of a Fact table in a Star Schema?", options: ["To store customer addresses.", "To record quantitative measurements, metrics, and business event transactions (e.g. amounts, quantities, timestamps).", "To store static reference lookups.", "To style visual charts."], correct: 1, explanation: "Fact tables store numerical business measurements and transactional events, surrounded by foreign keys pointing to dimension tables." },
          { question: "Why must a Date table have continuous, unbroken dates with zero missing days?", options: ["It is required by the Windows operating system.", "Power BI's DAX Time Intelligence engine requires contiguous date sequences to accurately calculate Year-to-Date and historical period shifts.", "To make the file size larger.", "It does not need continuous dates."], correct: 1, explanation: "Time Intelligence functions (like TOTALYTD and SAMEPERIODLASTYEAR) rely on contiguous sequential dates without gaps to calculate time-shifted filter contexts." },
          { question: "Why does a chart showing 'Sales by Month' sort as April, August, December by default if 'Sort by column' is not configured?", options: ["It is an Excel bug.", "Month names are text strings, and Power BI sorts text alphabetically by default unless instructed to sort by an underlying numeric Month Number column.", "April has the highest sales.", "Power BI prefers the letter A."], correct: 1, explanation: "Text columns sort alphabetically by default. You must explicitly set 'Sort by column' to a numeric sequence column (e.g. MonthNo 1 to 12)." },
          { question: "Why should you turn off the default 'Auto Date/Time' option in Power BI Options?", options: ["It prevents dates from showing.", "It generates hidden internal date tables behind every date column in every table, ballooning memory usage and file size.", "It forces Power BI into trial mode.", "It only works in US time zones."], correct: 1, explanation: "Auto Date/Time creates duplicate hidden calendar hierarchies for every timestamp in the model, wasting RAM and degrading enterprise performance." },
          { question: "In Kimball Dimensional Modeling, what is the structure called when Dimension tables are denormalized and connect directly to the central Fact table in a single hop?", options: ["Snowflake Schema", "Star Schema", "Galaxy Schema", "Linear Pipeline"], correct: 1, explanation: "The Star Schema features a central Fact table with direct 1-hop links to denormalized Dimension tables, resembling a star." }
        ],
        scenarios: [
          { question: "A colleague created a Star Schema where `Dim_Customer` contains 100,000 rows and `Fact_Orders` contains 5 million rows. How does Power BI's VertiPaq engine compress this so efficiently?", solution: "VertiPaq uses dictionary encoding and run-length encoding (RLE). Instead of storing repetitive customer names across 5 million rows, it stores text once in `Dim_Customer` and stores lightweight 4-byte integer keys in `Fact_Orders`. This achieves up to 10x-20x columnar memory compression." },
          { question: "How do you explain the difference between a Star Schema and a Snowflake Schema to a junior developer?", solution: "In a Star Schema, dimension tables are flattened (denormalized) and connect directly to the fact table in 1 hop. In a Snowflake schema, dimensions are normalized into sub-tables (e.g. Product -> Category -> Subcategory), requiring multi-hop joins that increase model complexity and reduce DAX query speed." },
          { question: "What happens if your transaction data starts on March 15, 2024, but your Dim_Calendar table starts on January 1, 2024?", solution: "This is standard and recommended. A Date table should always encompass complete calendar years (Jan 1 to Dec 31). Days with zero transactions will simply evaluate to 0 or blank in charts, while calendar calculations (YTD, QTD) remain mathematically sound." }
        ],
        miniAssignment: "Write the DAX expression to generate a Date table from Jan 1, 2024 to Dec 31, 2024 and add a Year column."
      }
    },

    // DAY 31
    {
      day: 31, phase: "Power BI", phaseId: 2,
      title: "Measures vs Calculated Columns & Evaluation Contexts",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master the foundational distinction in DAX: Calculated Columns vs Measures.",
        "Understand storage implications: Calculated Columns consume RAM and disk; Measures calculate in-memory dynamically on demand.",
        "Master Evaluation Contexts: Row Context (row-by-row iteration) vs Filter Context (surrounding visual filters).",
        "Establish an industry-standard 'Key Measures' table to organize DAX metrics cleanly."
      ],
      prerequisites: "Days 26-30 data modeling and relationships.",
      expectedOutcome: "The ability to choose correctly between calculated columns and measures, and create dedicated measure containers in Power BI.",
      topics: [
        {
          concept: "Calculated Columns vs Measures",
          what: "A Calculated Column calculates a static value for every row during data refresh and is stored in RAM. A Measure calculates dynamically on-the-fly based on the visual's current filter context and consumes zero storage.",
          why: "Creating hundreds of calculated columns balloons memory usage and slows refresh times. 90% of business metrics should be written as dynamic Measures.",
          how: "Use Calculated Columns ONLY when you need to use the result as a Slicer or Axis Category. Use Measures for all aggregations, ratios, and KPIs.",
          example: "Calculated Column: `Fee_Band = IF([Amount]>10000, \"High\", \"Low\")` (used in Slicer). Measure: `Total_Volume = SUM(Transactions[Amount])` (used in KPI card/chart).",
          businessCase: "Optimizing a 5-million-row transaction model by converting row-level revenue columns into a dynamic DAX measure.",
          pitfalls: "Writing `=SUM(Table[Amount])` inside a Calculated Column, which computes the grand total and repeats the exact same number on every single row."
        },
        {
          concept: "Evaluation Contexts: Row Context vs Filter Context",
          what: "Row Context exists when a formula iterates row-by-row (used in calculated columns and iterator functions like SUMX). Filter Context is the set of active filters filtering the data (from slicers, row headers, column headers, and page filters).",
          why: "Mastering Filter Context is the single most important skill in Power BI. Every DAX measure calculates inside the visual's active filter context.",
          how: "When a bar chart displays 'Equity', the filter context for that bar is `Category = 'Equity'`. The measure `SUM(Amount)` automatically filters and sums only Equity rows.",
          example: "A card visual displaying `Total Inflow` has an empty filter context, showing global grand total.",
          businessCase: "Explaining why a single measure `[Total Volume]` automatically computes different numbers when placed on a table broken down by State or Year.",
          pitfalls: "Confusing Row Context with Filter Context, leading to misunderstandings of how DAX aggregates data."
        }
      ],
      resources: [
        { title: "Calculated Columns vs Measures in Power BI", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-measures", time: "25 mins", covers: "Official guide on when to use measures vs columns." },
        { title: "Row Context and Filter Context Explained in 10 Minutes", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Row+Context+vs+Filter+Context", time: "20 mins", covers: "Visual explanation of DAX evaluation contexts." },
        { title: "Creating a Dedicated Measure Table in Power BI", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+BI+Dedicated+Measure+Table", time: "15 mins", covers: "Organizing DAX measures into a clean folder structure." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 30 Star Schema and Dim_Calendar setup." },
        { time: "50 mins", activity: "Concept Study: Study Measures vs Calculated Columns, Row Context, and Filter Context." },
        { time: "25 mins", activity: "Guided Practice: Create a dedicated '_Key Measures' table and write baseline DAX measures." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 measure vs column challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build Dedicated Measure Repository & Context Audit." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 31 assessment questions." }
      ],
      exercises: [
        {
          title: "Create a Dedicated '_Key Measures' Container Table",
          problem: "Create an empty table in Power BI named `_Key Measures` with a calculator icon to hold all business DAX measures centrally.",
          scenario: "Establishing enterprise model hygiene so analysts don't hunt through 10 tables to find measures.",
          instructions: "1. Home tab > Enter Data.\n2. Table name: `_Key Measures` > Click Load.\n3. Create a measure inside it.\n4. Delete the default empty 'Column1'. Notice the table icon changes to a calculator.",
          expectedOutput: "A dedicated `_Key Measures` table pinned to the top of the Fields pane.",
          hint: "Home > Enter Data > Name: `_Key Measures` > Create measure > Delete Column1.",
          solution: "Dedicated measure container created and pinned to the top of the data pane."
        },
        {
          title: "Calculated Column for Slicer Categorization",
          problem: "In `fact_transactions`, create a Calculated Column categorizing transactions: >= ₹50,000 as 'High Value', else 'Standard'.",
          scenario: "Enabling users to slice dashboard charts by transaction value band.",
          instructions: "1. Select `fact_transactions` table.\n2. Table tools > New Column.\n3. Write DAX: `Txn_Value_Band = IF(fact_transactions[Amount] >= 50000, \"High Value\", \"Standard\")`.\n4. Use it as a Slicer.",
          expectedOutput: "Calculated column populated row-by-row and functional in a Slicer.",
          hint: "Calculated column uses row context to evaluate [Amount] for each row.",
          solution: "Txn_Value_Band column created and verified in a slicer visual."
        },
        {
          title: "Observe Dynamic Filter Context in a Visual Matrix",
          problem: "Write measure `Total Volume = SUM(fact_transactions[Amount])`. Place it in a Matrix visual with `dim_mutual_funds[Category]` in rows and `dim_date[Year]` in columns.",
          scenario: "Verifying that a single measure dynamically responds to intersecting row and column filter contexts.",
          instructions: "1. Author measure `Total Volume` in `_Key Measures`.\n2. Build Matrix visual.\n3. Observe how each matrix cell evaluates within its unique intersecting filter context.",
          expectedOutput: "Matrix visual showing category by year totals and grand totals.",
          hint: "Total Volume = SUM(fact_transactions[Amount])",
          solution: "Measure dynamically computes values across all category-year intersections."
        }
      ],
      assignment: {
        title: "FinTech Dedicated Measure Repository & Context Architecture",
        scenario: "Standardize DAX calculation architecture across the FinTech project model.",
        deliverable: "1. Create `_Key Measures` table.\n2. Write 3 baseline measures: `[Total Inflow Volume]`, `[Total Transaction Count]`, `[Average Ticket Size]`.\n3. Create display folders inside `_Key Measures`: 'Volume Metrics', 'Count Metrics'.\n4. Create 1 calculated column in `dim_users`: `KYC_Badge = IF(dim_users[KYC_Status] = \"VERIFIED\", \"Verified Investor\", \"Pending Verification\")`.\n5. Verify that measures consume zero disk storage while calculated column stores data in Data View.",
        completionCriteria: "Clean measure repository with organized display folders and verified evaluation context."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary operational difference in storage between a Calculated Column and a Measure?", options: ["Calculated Columns are stored on disk and in RAM; Measures are calculated dynamically in memory on-the-fly and consume zero storage.", "Measures consume more storage.", "Calculated Columns are temporary; Measures are permanent.", "There is no difference."], correct: 0, explanation: "Calculated Columns calculate during data refresh and occupy permanent memory. Measures calculate dynamically at query time based on active visual filters and consume zero storage." },
          { question: "When is it strictly necessary to use a Calculated Column instead of a Measure?", options: ["Whenever calculating a sum.", "When you need to use the calculated values as a Slicer, an Axis category, or a Row/Column header in a Matrix.", "When working with numbers.", "When formatting currency."], correct: 1, explanation: "Measures cannot be placed in Slicers or on Chart Category Axes. If you need to filter or slice by a calculated category, you must use a Calculated Column." },
          { question: "What is 'Filter Context' in Power BI?", options: ["The color theme of the dashboard.", "The combination of active filters applied to a visual by slicers, report filters, page filters, row headers, and column headers that dictates which data rows a measure evaluates.", "A filter applied in Power Query.", "An SQL query."], correct: 1, explanation: "Filter Context is the active set of filters operating on any visual element that determines the subset of data rows the DAX formula computes." },
          { question: "What happens if you write `=SUM(fact_transactions[Amount])` inside a Calculated Column?", options: ["It calculates the sum for each individual row.", "It calculates the grand total of the entire table and repeats that identical grand total number on every single row.", "It throws an error.", "It formats the column as currency."], correct: 1, explanation: "Because SUM() is an aggregate function that evaluates across the entire table, inside a calculated column without context transition, it computes the entire table sum on every row." },
          { question: "Why should you organize all DAX measures into a dedicated '_Key Measures' table?", options: ["Power BI requires it to run.", "It prevents clutter, groups business logic centrally, and pins critical metrics to the top of the data pane for easy team collaboration.", "It speeds up calculations by 50%.", "It enables Excel export."], correct: 1, explanation: "A dedicated measure table centralizes business logic, making models modular, organized, and professional." }
        ],
        scenarios: [
          { question: "A junior analyst created 25 calculated columns to compute simple fee multiplications on a 10-million row table, and the file size grew from 40 MB to 350 MB. How do you fix it?", solution: "Delete the 25 calculated columns and replace them with DAX Measures using iterator functions (e.g. `[Total Fee] = SUMX(Transactions, Transactions[Amount] * Transactions[Fee_Rate])`). This eliminates 250 million stored cells, instantly shrinking the file back to ~40 MB while maintaining calculation accuracy." },
          { question: "How does Filter Context explain why the exact same measure `[Total Volume]` returns ₹50 Lakhs in one cell of a table and ₹1.2 Crores in another cell?", solution: "Each cell in a visual has a different filter context established by its row header (e.g. Row 1: State = 'Karnataka', Row 2: State = 'Maharashtra'). The measure dynamically evaluates against only the rows that satisfy the cell's active filter context." },
          { question: "What is Context Transition in DAX and when does it occur?", solution: "Context Transition is the transformation of a Row Context into an equivalent Filter Context. It occurs automatically whenever a Measure is called inside an iterator (like SUMX) or when the CALCULATE() function is invoked inside a row context." }
        ],
        miniAssignment: "Create an empty table in Power BI, author a measure named [TestMeasure] = 100, and delete the empty column to verify the calculator icon appears."
      }
    },

    // DAY 32
    {
      day: 32, phase: "Power BI", phaseId: 2,
      title: "Core Mathematical & Aggregation DAX Measures (SUM, COUNTROWS, DIVIDE)",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master foundational DAX aggregation functions: SUM, COUNTROWS, DISTINCTCOUNT, MIN, MAX.",
        "Implement safe mathematical division using DIVIDE(numerator, denominator, [alternate_result]).",
        "Understand row-level iterators (X-functions): SUMX, AVERAGEX, and COUNTX.",
        "Author the primary financial KPI measure suite for the FinTech investment platform."
      ],
      prerequisites: "Day 31 measures and evaluation contexts.",
      expectedOutcome: "A suite of production-grade DAX measures computing total inflow volume, active investor counts, average ticket sizes, and payment success rates without divide-by-zero crashes.",
      topics: [
        {
          concept: "Safe Division with DIVIDE vs Forward Slash (/)",
          what: "DIVIDE performs mathematical division with built-in divide-by-zero protection, returning BLANK() or a specified alternate result instead of throwing an error or displaying 'Infinity'.",
          why: "In newly launched funds or during payment gateway outages, denominators frequently drop to zero (e.g. 0 total transactions). Using `/` crashes visuals with 'Infinity' or NaN.",
          how: "Write `[Success Rate %] = DIVIDE([Successful Txns], [Total Txns], 0)`.",
          example: "DIVIDE(100, 0, 0) cleanly returns 0.0% instead of breaking the dashboard card visual.",
          businessCase: "Calculating payment success ratios, conversion rates, and profit margins across volatile financial channels.",
          pitfalls: "Using standard forward slash `/` in financial reporting measures, creating brittle executive dashboards."
        },
        {
          concept: "Standard Aggregators vs Row Iterators (SUM vs SUMX)",
          what: "SUM operates directly on a single column. SUMX is an iterator function that evaluates a row-level expression row-by-row across a table and sums the results.",
          why: "If you need to calculate `Amount * Commission_Rate` per row and sum the total, you cannot write `SUM(Amount * Rate)` (SUM only accepts a single column). You must use `SUMX(Table, Amount * Rate)`.",
          how: "`[Total Net Payout] = SUMX(Fact_Transactions, Fact_Transactions[Amount] - Fact_Transactions[Fee])`.",
          example: "SUMX(Dim_MutualFund, Dim_MutualFund[AUM] * Dim_MutualFund[Expense_Ratio]) computes total AMC revenue.",
          businessCase: "Calculating net merchant settlement payouts and fee deductions across transactions with variable fee schedules.",
          pitfalls: "Using SUMX indiscriminately when a simple SUM on a single column is faster and more efficient."
        }
      ],
      resources: [
        { title: "DAX DIVIDE Function Official Documentation", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/dax/divide-function-dax", time: "15 mins", covers: "Syntax, performance, and divide-by-zero protection." },
        { title: "SUM vs SUMX in DAX: When to Use Which", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+SUM+vs+SUMX+DAX", time: "20 mins", covers: "Columnar aggregation vs row-by-row iteration mechanics." },
        { title: "Top 10 Essential DAX Measures for Power BI Beginners", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Top+10+DAX+Measures+Power+BI", time: "30 mins", covers: "SUM, COUNTROWS, DISTINCTCOUNT, DIVIDE, and formatting." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 31 measures container and filter context." },
        { time: "50 mins", activity: "Concept Study: Study SUM, COUNTROWS, DISTINCTCOUNT, DIVIDE, and SUMX iterator mechanics." },
        { time: "25 mins", activity: "Guided Practice: Author the 5 core FinTech KPI measures in Power BI." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 aggregation DAX challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build Executive Core KPI Measure Library." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 32 assessment questions." }
      ],
      exercises: [
        {
          title: "Author Safe Payment Success Rate Measure",
          problem: "Write a DAX measure `[Payment Success Rate %]` dividing successful transactions by total transactions, handling division by zero.",
          scenario: "Executive operational health indicator.",
          instructions: "1. In `_Key Measures`, author measure.\n2. Use DIVIDE.\n3. Format as Percentage with 1 decimal place.",
          expectedOutput: "Formatted percentage measure (e.g. 94.2%).",
          hint: "DIVIDE([Successful Txns], [Total Txns], 0)",
          solution: "Payment Success Rate % = DIVIDE([Total Successful Transactions], [Total Transactions], 0)"
        },
        {
          title: "Active Investor Count with DISTINCTCOUNT",
          problem: "Write a measure `[Active Investors]` calculating unique users who have executed at least one transaction.",
          scenario: "Platform customer reach metric.",
          instructions: "1. Use DISTINCTCOUNT on `fact_transactions[user_id]`.\n2. Format as whole number with thousands separator.",
          expectedOutput: "Unique customer count measure.",
          hint: "DISTINCTCOUNT(fact_transactions[user_id])",
          solution: "Active Investors = DISTINCTCOUNT(fact_transactions[user_id])"
        },
        {
          title: "Calculate Net Revenue with SUMX Iterator",
          problem: "Using SUMX, calculate total net revenue earned: `Amount * (MDR_Rate / 100)` evaluated row-by-row across `fact_transactions` joined with `dim_gateways`.",
          scenario: "Platform financial earnings calculation.",
          instructions: "1. Author measure using SUMX and RELATED.\n2. `SUMX(fact_transactions, fact_transactions[Amount] * RELATED(dim_gateways[MDR_Rate]))`.\n3. Format as Currency.",
          expectedOutput: "Total net platform commission revenue.",
          hint: "Use RELATED() inside SUMX to access rate from dimension table.",
          solution: "Total Platform Fee = SUMX(fact_transactions, fact_transactions[Amount] * RELATED(dim_gateways[MDR_Rate]))"
        }
      ],
      assignment: {
        title: "FinTech Executive Core KPI Measure Suite",
        scenario: "Author the master baseline DAX measure suite inside `_Key Measures` for the FinTech project.",
        deliverable: "Write and format the following 6 production DAX measures:\n1. `[Total Inflow Volume] = SUM(fact_transactions[Amount])` (Currency format).\n2. `[Total Transaction Count] = COUNTROWS(fact_transactions)` (Whole number).\n3. `[Active Investors] = DISTINCTCOUNT(fact_transactions[user_id])`.\n4. `[Average Ticket Size] = DIVIDE([Total Inflow Volume], [Total Transaction Count], 0)` (Currency format).\n5. `[Total Active SIP Mandates] = CALCULATE(COUNTROWS(fact_sip_mandates), fact_sip_mandates[status] = \"ACTIVE\")`.\n6. `[Overall Success Rate %] = DIVIDE([Successful Volume], [Total Inflow Volume], 0)` (Percentage format).",
        completionCriteria: "All 6 measures authored inside `_Key Measures`, verified against card visuals, and formatted with appropriate currency and percentage symbols."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary technical advantage of using DIVIDE(numerator, denominator) over the standard slash operator (/)?", options: ["DIVIDE runs faster in every case.", "DIVIDE gracefully handles division-by-zero, returning BLANK or an alternate result instead of throwing an error or displaying 'Infinity'.", "DIVIDE only works with whole numbers.", "DIVIDE formats the result as currency automatically."], correct: 1, explanation: "DIVIDE handles division by zero safely, preventing ugly 'Infinity' or NaN errors that crash or corrupt dashboard visuals." },
          { question: "Why is COUNTROWS(Table) preferred over COUNT(Table[Column]) when counting table rows?", options: ["COUNT is deprecated.", "COUNTROWS is clearer, optimized by the VertiPaq engine to count table records without scanning individual column values, and does not skip rows where a specific column is NULL.", "COUNT only counts text.", "COUNTROWS only counts numbers."], correct: 1, explanation: "COUNTROWS(Table) counts rows directly from table metadata, ignoring column nullability and executing with maximum efficiency." },
          { question: "What does the DISTINCTCOUNT() function return?", options: ["A list of distinct names.", "The integer count of unique, distinct non-null values in a column.", "The total count of all rows.", "The duplicate count."], correct: 1, explanation: "DISTINCTCOUNT() calculates the scalar count of unique distinct values in a specified column." },
          { question: "When must you use an iterator function like SUMX instead of a simple SUM?", options: ["Whenever calculating totals.", "When you need to evaluate a multi-column row-level mathematical expression across a table before summing the result (e.g. Price * Quantity).", "When working with Date tables.", "When formatting percentages."], correct: 1, explanation: "Standard SUM only accepts a single column reference. SUMX iterates row-by-row across a table to evaluate multi-column expressions before aggregating the sum." },
          { question: "What does the RELATED() function do inside a SUMX iterator?", options: ["Finds related family members.", "Fetches a column value from a related dimension table on the '1' side of a relationship into the row context of the Fact table.", "Creates a new relationship.", "Replaces VLOOKUP in Excel."], correct: 1, explanation: "RELATED() traverses an active 1-to-Many relationship to retrieve attributes from the parent dimension table into the row context of the fact table." }
        ],
        scenarios: [
          { question: "Why does writing `[Avg Ticket] = AVERAGE(fact_transactions[Amount])` sometimes differ from `[Avg Ticket] = DIVIDE([Total Inflow], [Total Transactions])`?", solution: "AVERAGE skips rows where Amount is NULL. If some transactions have NULL amounts (e.g. pending gateway attempts), AVERAGE excludes them from the denominator, whereas `[Total Transactions]` using COUNTROWS includes all rows, yielding a true operational average per transaction attempt." },
          { question: "How do you format a measure dynamically so it displays in Crores (e.g. '₹4.25 Cr') on an executive card visual?", solution: "Use the visual's 'Display units' property in the Format pane set to 'Millions' or write a formatted string measure: `[Volume (Cr)] = \"₹\" & FORMAT(DIVIDE([Total Inflow Volume], 10000000), \"0.00\") & \" Cr\"`." },
          { question: "Why should you never write a measure that references raw column names without specifying the table name (e.g. SUM([Amount]) vs SUM(Transactions[Amount]))?", solution: "DAX best practice mandates fully qualified column references (`Table[Column]`) and unqualified measure references (`[Measure]`). This instantly distinguishes columns from measures in code, preventing ambiguity and syntax bugs." }
        ],
        miniAssignment: "Write a DAX measure named [Average Order Value] dividing [Total Sales] by [Total Orders] with a 0 fallback."
      }
    },

    // DAY 33
    {
      day: 33, phase: "Power BI", phaseId: 2,
      title: "Context Transition & The CALCULATE Function (ALL, ALLEXCEPT, FILTER)",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Master CALCULATE(): the most powerful and fundamental function in DAX.",
        "Understand Context Modification: adding, replacing, or clearing filter context.",
        "Use the ALL() and ALLEXCEPT() functions to remove visual filters and compute percentage-of-total market share.",
        "Apply the FILTER() table function to apply complex multi-condition filters inside CALCULATE."
      ],
      prerequisites: "Days 31-32 measures and evaluation contexts.",
      expectedOutcome: "The ability to modify filter contexts dynamically, compute percentage of category totals, and write targeted conditional aggregations in DAX.",
      topics: [
        {
          concept: "The CALCULATE Function: Engine of DAX",
          what: "CALCULATE(Expression, Filter1, Filter2, ...) evaluates a DAX expression inside a modified filter context created by its filter arguments.",
          why: "Without CALCULATE, measures can only react passively to whatever filters exist on the visual. CALCULATE allows you to override, add, or strip filters programmatically.",
          how: "`[Failed Txn Volume] = CALCULATE([Total Inflow Volume], Fact_Transactions[Status] = \"FAILED\")`.",
          example: "`[UPI Volume] = CALCULATE([Total Inflow Volume], Fact_Transactions[Payment_Mode] = \"UPI\")`.",
          businessCase: "Isolating failed transaction amounts to show in executive KPI cards regardless of which status is selected in slicers.",
          pitfalls: "Forgetting that filter arguments inside CALCULATE overwrite existing conflicting filters in the filter context by default."
        },
        {
          concept: "Removing Filters with ALL & Calculating Market Share",
          what: "ALL(Table) or ALL(Table[Column]) ignores all active filters on the specified table or column, returning the global grand total.",
          why: "To calculate what percentage of total volume an individual fund category represents, you divide the category volume by the grand total across all categories.",
          how: "`[Total Volume All Funds] = CALCULATE([Total Inflow Volume], ALL(Dim_MutualFund))`.\n`[Category Market Share %] = DIVIDE([Total Inflow Volume], [Total Volume All Funds], 0)`.",
          example: "In a table showing Equity, Debt, and Hybrid, `[Total Volume All Funds]` displays ₹10 Cr on every row, allowing percentage-of-total calculations.",
          businessCase: "Computing mutual fund category asset distribution and gateway share percentages.",
          pitfalls: "Using `ALL(Table)` when you only meant to clear a specific column with `ALL(Table[Column])`, accidentally wiping out date and state filters as well."
        }
      ],
      resources: [
        { title: "The CALCULATE Function in DAX: Ultimate Guide", platform: "SQLBI / Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+CALCULATE+Function+DAX+Power+BI", time: "25 mins", covers: "Filter context modification, overriding filters, and Boolean filters." },
        { title: "ALL vs ALLEXCEPT vs ALLSELECTED Explained", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+ALL+vs+ALLEXCEPT+vs+ALLSELECTED", time: "20 mins", covers: "Clearing filters, calculating percentages of total, and visual totals." },
        { title: "Official Microsoft DAX CALCULATE Reference", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/dax/calculate-function-dax", time: "20 mins", covers: "Official documentation on CALCULATE filter modifiers." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 32 DIVIDE and SUMX iterators." },
        { time: "50 mins", activity: "Concept Study: Study CALCULATE mechanics, ALL, ALLEXCEPT, and FILTER table functions." },
        { time: "25 mins", activity: "Guided Practice: Replicate percentage-of-total and isolated gateway measures." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 CALCULATE challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build Executive Market Share & Failure Exposure Suite." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 33 assessment questions." }
      ],
      exercises: [
        {
          title: "Calculate Market Share Percentage with ALL",
          problem: "Write a measure `[% Market Share]` that calculates the volume percentage each mutual fund category represents of the total platform volume.",
          scenario: "Executive asset allocation breakdown.",
          instructions: "1. Author `[Total Volume All Categories] = CALCULATE([Total Inflow Volume], ALL(Dim_MutualFund[Category]))`.\n2. Author `[% Market Share] = DIVIDE([Total Inflow Volume], [Total Volume All Categories], 0)`.\n3. Format as Percentage (0.0%).",
          expectedOutput: "Dynamic percentage measure summing to 100% across categories.",
          hint: "Use ALL(Dim_MutualFund[Category]) in denominator.",
          solution: "% Market Share = DIVIDE([Total Inflow Volume], CALCULATE([Total Inflow Volume], ALL(Dim_MutualFund[Category])), 0)"
        },
        {
          title: "Isolate Razorpay Failure Loss Volume with CALCULATE",
          problem: "Author a measure `[Razorpay Failure Loss]` calculating total volume where Gateway is 'Razorpay' and Status is 'FAILED'.",
          scenario: "Vendor partner performance penalty tracking.",
          instructions: "1. Use CALCULATE.\n2. Expression: `[Total Inflow Volume]`.\n3. Filter 1: `Dim_Gateway[Gateway_Name] = \"Razorpay\"`.\n4. Filter 2: `Fact_Transactions[Status] = \"FAILED\"`.",
          expectedOutput: "Currency measure isolated to Razorpay failures.",
          hint: "CALCULATE([Total Inflow Volume], Dim_Gateway[Gateway_Name] = \"Razorpay\", Fact_Transactions[Status] = \"FAILED\")",
          solution: "Razorpay Failure Loss = CALCULATE([Total Inflow Volume], Dim_Gateway[Gateway_Name] = \"Razorpay\", Fact_Transactions[Status] = \"FAILED\")"
        },
        {
          title: "Complex Multi-Condition Filter Using FILTER()",
          problem: "Calculate volume for transactions where Amount > ₹50,000 AND user is from 'Tamil Nadu' or 'Karnataka' using the FILTER() function.",
          scenario: "High-value Southern Tier-1 transaction tracking.",
          instructions: "1. Wrap FILTER() inside CALCULATE.\n2. `CALCULATE([Total Inflow Volume], FILTER(Dim_User, Dim_User[State] IN {\"Tamil Nadu\", \"Karnataka\"}), Fact_Transactions[Amount] > 50000)`.",
          expectedOutput: "Filtered volume for high-value southern investors.",
          hint: "Use FILTER(table, condition) for multi-column or cross-table logic.",
          solution: "Southern HNW Volume = CALCULATE([Total Inflow Volume], FILTER(Dim_User, Dim_User[State] IN {\"Tamil Nadu\", \"Karnataka\"}), Fact_Transactions[Amount] > 50000)"
        }
      ],
      assignment: {
        title: "FinTech Market Share & Operational Risk Measure Suite",
        scenario: "Author the advanced filter-context-modified measures for executive reporting.",
        deliverable: "Write 5 production DAX measures in `_Key Measures`:\n1. `[Total Volume All Funds]`: Global volume clearing all fund filters.\n2. `[Category Share %]`: Category volume divided by total volume.\n3. `[Failed Transaction Volume]`: Total volume where status = 'FAILED'.\n4. `[High Ticket Inflow]`: Total volume where Amount >= ₹1,00,000.\n5. `[Clean Mandate Volume]`: Total SIP volume where Mandate Status is 'ACTIVE' and customer KYC is 'VERIFIED'.",
        completionCriteria: "All 5 measures verified in a Matrix visual, correctly overriding filters and formatted with currency and percentage symbols."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary function of CALCULATE() in DAX?", options: ["To add numbers together.", "To evaluate an expression inside a modified filter context.", "To calculate compound interest.", "To import CSV files."], correct: 1, explanation: "CALCULATE() evaluates an expression under a modified filter context, adding, replacing, or removing filters." },
          { question: "What does the ALL() function do when used inside CALCULATE()?", options: ["Selects all rows.", "Clears and ignores the filters on the specified table or column, returning the unfiltered total.", "Deletes the data.", "Duplicates the table."], correct: 1, explanation: "ALL() serves as a filter removal modifier inside CALCULATE, returning the total across all rows regardless of visual filters." },
          { question: "How does ALLEXCEPT(Table, Table[Column]) differ from ALL(Table)?", options: ["ALLEXCEPT clears filters on all columns of the table EXCEPT the specified column.", "ALLEXCEPT deletes the column.", "ALLEXCEPT only works on numbers.", "There is no difference."], correct: 0, explanation: "ALLEXCEPT clears filters on all columns of the table except the ones explicitly listed, preserving filters on that specific column." },
          { question: "What happens if a visual is filtered by 'Status = FAILED', but a measure inside it is written as `CALCULATE([Volume], Fact_Transactions[Status] = \"SUCCESS\")`?", options: ["The visual crashes.", "CALCULATE overrides the visual filter, evaluating the measure for 'Status = SUCCESS'.", "It returns BLANK.", "It returns zero."], correct: 1, explanation: "By default, filter arguments inside CALCULATE overwrite existing visual filters on the same column." },
          { question: "When should you use the FILTER(Table, Condition) function inside CALCULATE?", options: ["For every simple filter.", "When you need to filter on a measure, perform multi-column comparisons, or evaluate complex row-level expressions that standard boolean filter syntax cannot handle.", "Never, FILTER is deprecated.", "Only in calculated columns."], correct: 1, explanation: "FILTER() is an iterator that evaluates complex row-by-row expressions, required when comparing multiple columns or filtering by a measure." }
        ],
        scenarios: [
          { question: "What is the difference between ALL(Dim_Product) and ALLSELECTED(Dim_Product) when calculating percentage of total on a visual?", solution: "`ALL(Dim_Product)` ignores all filters, including external slicers, dividing by the absolute global grand total. `ALLSELECTED(Dim_Product)` ignores the row headers in the visual but respects user slicers, dividing by the total of the currently sliced selection." },
          { question: "Why does writing `CALCULATE([Total Inflow], Fact_Transactions[Amount] > [Average Ticket])` throw a syntax error without using FILTER()?", solution: "Standard boolean filter arguments in CALCULATE can only reference static values (e.g. > 50000). To filter by a dynamic Measure (`[Average Ticket]`), you must wrap it in the FILTER table iterator: `CALCULATE([Total Inflow], FILTER(Fact_Transactions, Fact_Transactions[Amount] > [Average Ticket]))`." },
          { question: "Explain what happens during 'Context Transition' when a Measure is referenced inside a calculated column.", solution: "Calling a measure inside a calculated column triggers Context Transition: the current row context is automatically wrapped in a CALCULATE() behind the scenes, transforming the row's values into an equivalent filter context." }
        ],
        miniAssignment: "Write a DAX measure [Technology Share %] that divides [Tech Fund Volume] by [Total Fund Volume]."
      }
    },

    // DAY 34
    {
      day: 34, phase: "Power BI", phaseId: 2,
      title: "Time Intelligence in DAX (TOTALYTD, SAMEPERIODLASTYEAR, DATEADD)",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Master DAX Time Intelligence prerequisites: contiguous Date table marked as Date Table.",
        "Calculate Year-to-Date (YTD), Quarter-to-Date (QTD), and Month-to-Date (MTD) cumulative metrics using TOTALYTD().",
        "Perform historical period comparisons using SAMEPERIODLASTYEAR() and DATEADD().",
        "Calculate dynamic Month-over-Month (MoM) and Year-over-Year (YoY) growth percentages."
      ],
      prerequisites: "Day 30 Dim_Calendar table and Day 33 CALCULATE function.",
      expectedOutcome: "A suite of Time Intelligence measures tracking YTD cumulative inflows, prior-year comparisons, and MoM growth rates.",
      topics: [
        {
          concept: "Cumulative Time Intelligence (YTD, QTD, MTD)",
          what: "TOTALYTD(Expression, Dates, [YearEndDate]) computes cumulative totals starting from the first day of the fiscal year up to the current date in context.",
          why: "Executive board reporting revolves around cumulative YTD revenue targets: 'Are we on track to hit our ₹50 Crore annual AUM goal?'",
          how: "`[Inflow YTD] = TOTALYTD([Total Inflow Volume], Dim_Date[Date])`.",
          example: "In March 2024, `[Inflow YTD]` sums January + February + March volume automatically.",
          businessCase: "Cumulative annual SIP inflow scorecard for financial year auditing.",
          pitfalls: "Passing `Fact_Transactions[Created_At]` to TOTALYTD instead of `Dim_Date[Date]`. Time Intelligence requires the continuous Date dimension."
        },
        {
          concept: "Period Shifts & Growth Rates (SAMEPERIODLASTYEAR & DATEADD)",
          what: "SAMEPERIODLASTYEAR shifts the date filter context back exactly one year. DATEADD shifts by custom intervals (e.g. -1 MONTH, -1 QUARTER).",
          why: "Comparing November 2024 volume against November 2023 volume evaluates seasonal organic growth.",
          how: "`[Prior Month Volume] = CALCULATE([Total Inflow Volume], DATEADD(Dim_Date[Date], -1, MONTH))`.\n`[MoM Growth %] = DIVIDE([Total Inflow Volume] - [Prior Month Volume], [Prior Month Volume], 0)`.",
          example: "Current Month = ₹1.2 Cr; Prior Month = ₹1.0 Cr; MoM Growth = +20.0%.",
          businessCase: "Tracking monthly customer investment acceleration and festive season deposit surges.",
          pitfalls: "Failing to mark `Dim_Date` as an official Date Table, causing SAMEPERIODLASTYEAR to return unexpected blanks."
        }
      ],
      resources: [
        { title: "DAX Time Intelligence Masterclass (YTD, Prior Year, Growth)", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Power+BI+Time+Intelligence+YTD+Prior+Year", time: "25 mins", covers: "TOTALYTD, SAMEPERIODLASTYEAR, DATEADD, and YoY growth." },
        { title: "Time Intelligence Functions Official Guide", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/dax/time-intelligence-functions-dax", time: "25 mins", covers: "Official documentation on calendar shifts and date tables." },
        { title: "Month-over-Month and Year-over-Year DAX Step-by-Step", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+BI+Month+over+Month+Growth+DAX", time: "25 mins", covers: "Writing growth rate measures and handling edge cases." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 33 CALCULATE and ALL functions." },
        { time: "50 mins", activity: "Concept Study: Study TOTALYTD, SAMEPERIODLASTYEAR, DATEADD, and growth rate formulas." },
        { time: "25 mins", activity: "Guided Practice: Author YTD, Prior Month, and MoM Growth measures." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 Time Intelligence challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build Executive YTD & Historical Growth Board." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 34 assessment questions." }
      ],
      exercises: [
        {
          title: "Calculate Year-to-Date (YTD) Cumulative Inflow",
          problem: "Author measure `[Inflow YTD]` calculating cumulative volume from Jan 1 up to the current date context.",
          scenario: "Executive cumulative annual target tracking.",
          instructions: "1. In `_Key Measures`, use TOTALYTD.\n2. Expression: `[Total Inflow Volume]`.\n3. Dates: `Dim_Date[Date]`.\n4. Format as Currency.",
          expectedOutput: "Cumulative measure steadily climbing across months in a line chart.",
          hint: "TOTALYTD([Total Inflow Volume], Dim_Date[Date])",
          solution: "Inflow YTD = TOTALYTD([Total Inflow Volume], Dim_Date[Date])"
        },
        {
          title: "Calculate Prior Month Volume with DATEADD",
          problem: "Write measure `[Prior Month Volume]` shifting the active date context back by 1 month.",
          scenario: "Month-over-Month variance analysis.",
          instructions: "1. Use CALCULATE.\n2. Expression: `[Total Inflow Volume]`.\n3. Filter: `DATEADD(Dim_Date[Date], -1, MONTH)`.\n4. Format as Currency.",
          expectedOutput: "Prior month volume displaying alongside current month.",
          hint: "CALCULATE([Total Inflow Volume], DATEADD(Dim_Date[Date], -1, MONTH))",
          solution: "Prior Month Volume = CALCULATE([Total Inflow Volume], DATEADD(Dim_Date[Date], -1, MONTH))"
        },
        {
          title: "Calculate Month-over-Month (MoM) Growth Percentage",
          problem: "Using `[Total Inflow Volume]` and `[Prior Month Volume]`, compute `[MoM Volume Growth %]` with divide-by-zero protection.",
          scenario: "Operational growth momentum indicator.",
          instructions: "1. Author measure using DIVIDE.\n2. Numerator: `[Total Inflow Volume] - [Prior Month Volume]`.\n3. Denominator: `[Prior Month Volume]`.\n4. Format as Percentage (+0.0%;-0.0%).",
          expectedOutput: "Formatted growth percentage (e.g. +14.2%).",
          hint: "DIVIDE([Total Inflow Volume] - [Prior Month Volume], [Prior Month Volume], 0)",
          solution: "MoM Volume Growth % = DIVIDE([Total Inflow Volume] - [Prior Month Volume], [Prior Month Volume], 0)"
        }
      ],
      assignment: {
        title: "FinTech Executive Time Intelligence & Growth Suite",
        scenario: "Complete the historical and cumulative KPI suite for the executive dashboard.",
        deliverable: "Write 5 production DAX measures:\n1. `[Inflow YTD]`: Cumulative annual volume.\n2. `[Inflow QTD]`: Cumulative quarterly volume (`TOTALQTD`).\n3. `[Inflow SPLY]`: Same Period Last Year volume using `SAMEPERIODLASTYEAR(Dim_Date[Date])`.\n4. `[YoY Volume Growth %]`: Year-over-Year growth compared to same period last year.\n5. `[Prior Month Success Rate %]`: Gateway success percentage in the preceding month.",
        completionCriteria: "All 5 measures verified on a Date-sorted Line and Matrix visual, with zero #ERROR or NaN outputs."
      },
      assessment: {
        mcqs: [
          { question: "Which column MUST be passed as the date argument to DAX Time Intelligence functions?", options: ["The date column from the Fact table.", "The contiguous [Date] column from the dedicated Dim_Date table marked as an official Date Table.", "A text column containing months.", "TODAY()"], correct: 1, explanation: "Time Intelligence functions strictly require the continuous, unbroken [Date] column from a dedicated Date dimension." },
          { question: "What does SAMEPERIODLASTYEAR(Dim_Date[Date]) do?", options: ["Deletes last year's data.", "Shifts the active date filter context back in time by exactly one calendar year.", "Calculates last year's average.", "Duplicates the table."], correct: 1, explanation: "SAMEPERIODLASTYEAR shifts the current date filter context back by exactly 1 year (e.g. June 2024 becomes June 2023)." },
          { question: "What is the difference between DATEADD(Dates, -1, MONTH) and DATEADD(Dates, -1, YEAR)?", options: ["There is no difference.", "The first shifts the filter context back by 1 month; the second shifts it back by 1 full year.", "DATEADD cannot handle months.", "YEAR is faster."], correct: 1, explanation: "DATEADD accepts interval parameters ('DAY', 'MONTH', 'QUARTER', 'YEAR'), shifting the filter context by the specified units." },
          { question: "Why does a cumulative YTD line chart sometimes flatten out into a straight line for future months?", options: ["It is an operating system error.", "If the Date table extends into future dates (e.g. Dec 2025) and no future transactions exist, TOTALYTD repeats the latest known cumulative value across future months unless filtered.", "Power BI only supports 3 months.", "The chart crashed."], correct: 1, explanation: "If the Date dimension extends beyond the latest transaction date, TOTALYTD repeats the cumulative total. Best practice is to filter: `IF(MIN(Dim_Date[Date]) <= MAX(Fact_Transactions[Created_At]), TOTALYTD(...))`." },
          { question: "Which function calculates cumulative volume for a quarter?", options: ["TOTALQTD()", "QUARTERTOTAL()", "SUMQUARTER()", "QTD()"], correct: 0, explanation: "TOTALQTD(Expression, Dates) computes Quarter-to-Date cumulative values." }
        ],
        scenarios: [
          { question: "Why should you author `[MoM Growth %]` as a standalone Measure rather than calculating it inside an Excel-like calculated column?", solution: "A measure dynamically computes MoM growth for any selection: whether the user filters to a specific payment gateway, a specific mutual fund category, or a specific customer state. A calculated column would be frozen to static row-level numbers." },
          { question: "A report for February 29 (Leap Year) compares against last year. How does SAMEPERIODLASTYEAR handle February 29 in a non-leap year?", solution: "DAX handles leap-year edge cases automatically: when shifting February 29 back to a non-leap year, it shifts to February 28, preventing missing date errors." },
          { question: "How do you calculate a 3-month rolling moving sum in DAX using DATESINPERIOD?", solution: "`[Rolling 3M Inflow] = CALCULATE([Total Inflow Volume], DATESINPERIOD(Dim_Date[Date], LASTDATE(Dim_Date[Date]), -3, MONTH))`." }
        ],
        miniAssignment: "Write a DAX measure named [Sales YTD] using TOTALYTD on [Total Sales] and Dim_Date[Date]."
      }
    },

    // DAY 35 (Weekly Assessment 5)
    {
      day: 35, phase: "Power BI", phaseId: 2,
      title: "Visual Storytelling & Core Visualizations [Weekly Assessment 5]",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Select the right visual for the business question: Cards, Clustered/Stacked Columns, Lines, Area, and Matrix visuals.",
        "Implement financial conditional formatting in tables: Background color scales, data bars, and status indicator icons.",
        "Design executive KPI summary cards with new Card (Visual) multi-metric callouts and trend indicators.",
        "Apply professional data visualization design: color palettes, typography, contrast, and decluttering chart junk.",
        "Synthesize Weeks 1–5 competencies in the comprehensive Weekly Assessment 5."
      ],
      prerequisites: "Days 26-34 modeling, DAX measures, and Time Intelligence.",
      expectedOutcome: "The ability to assemble polished, executive-ready analytical canvases adhering to international visual reporting standards (IBCS).",
      topics: [
        {
          concept: "Visual Selection & Cognitive Load Management",
          what: "Choosing visual types based on analytical intent: Trends over time: Line/Area; Comparisons across categories = Bar/Column; Multi-dimensional breakdowns = Matrix; High-level pulse = KPI Cards.",
          why: "Using pie charts with 15 slices or 3D visuals forces executive stakeholders to struggle decoding angles, increasing cognitive fatigue.",
          how: "Use horizontal bar charts for long category names (e.g. Fund Names); use line charts for chronological dates; use Matrix with data bars for financial statements.",
          example: "Replacing a 10-slice pie chart with a clean sorted horizontal bar chart with data labels.",
          businessCase: "Executive quarterly business review presentation where leadership needs to digest operational health in 45 seconds.",
          pitfalls: "Using pie or donut charts with more than 3-4 slices, or using rainbow color palettes with no semantic meaning."
        },
        {
          concept: "Conditional Formatting & Semantic Color Coding",
          what: "Applying dynamic rules to cell backgrounds, font colors, data bars, or icons based on measure thresholds (e.g. Green for >95% success, Red for <90%).",
          why: "Scanning a 50-row matrix of numbers is slow; conditional color alerts immediately direct stakeholder eyes to operational anomalies and SLA breaches.",
          how: "Format visual > Elements > Cell elements > Enable Background color / Data bars / Icons > Set Rules based on `[Payment Success Rate %]`.",
          example: "Red flag icon next to any payment gateway whose failure rate exceeds 8%.",
          businessCase: "Operational payment gateway SLA monitoring screen for operations support leads.",
          pitfalls: "Using bright red and green excessively across the entire screen, creating a 'Christmas tree' effect that overwhelms the user."
        }
      ],
      resources: [
        { title: "Power BI Visualizations Masterclass (Do's and Don'ts)", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Power+BI+Visualizations+Best+Practices", time: "25 mins", covers: "Visual choices, layout grids, uncluttering, and color theory." },
        { title: "Conditional Formatting Masterclass in Power BI Tables & Matrix", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+BI+Conditional+Formatting", time: "25 mins", covers: "Rules, color scales, data bars, and dynamic status icons." },
        { title: "Visual Types in Power BI Desktop Official Reference", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-types-for-reports", time: "20 mins", covers: "Official catalog of visual properties and formatting options." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 34 Time Intelligence and growth measures." },
        { time: "50 mins", activity: "Concept Study: Study visual selection rules, cognitive load, semantic color theory, and formatting." },
        { time: "25 mins", activity: "Guided Practice: Build executive KPI cards and formatted matrix tables." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 visual design challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Complete Weekly Assessment 5 Visual Canvas." },
        { time: "20 mins", activity: "Quiz & Review: Complete Weekly Assessment 5 assessment questions." }
      ],
      exercises: [
        {
          title: "Build Executive Multi-Metric KPI Card Block",
          problem: "Design a top-row KPI card block displaying: Total Inflow Volume (in Cr), Active Investors, and Payment Success Rate %.",
          scenario: "Executive dashboard header row.",
          instructions: "1. Insert new Card visual (or 3 individual cards).\n2. Add measures: `[Total Inflow Volume]`, `[Active Investors]`, `[Payment Success Rate %]`.\n3. Format callout values: font size 28, bold, clean labels below.\n4. Align horizontally at top of canvas.",
          expectedOutput: "Clean executive card strip with clear metric hierarchy.",
          hint: "Insert > Card visual > Add measures > Format Callout value.",
          solution: "Executive KPI card strip assembled with consistent typography and formatting."
        },
        {
          title: "Matrix Visual with Embedded Gradient Data Bars",
          problem: "Construct a Matrix showing Mutual Fund Categories in rows, Years in columns, and Total Volume in values with embedded gradient data bars.",
          scenario: "Asset category distribution analysis.",
          instructions: "1. Insert Matrix visual.\n2. Rows: `Dim_MutualFund[Category]`, Columns: `Dim_Date[Year]`, Values: `[Total Inflow Volume]`.\n3. Format > Cell elements > Turn on Data bars > Choose subtle blue gradient.\n4. Check 'Show bar only' or keep numbers with bars.",
          expectedOutput: "Visual financial matrix combining tabular precision with instant visual weight.",
          hint: "Format > Cell elements > Data bars.",
          solution: "Matrix visual configured with embedded data bars for immediate visual comparison."
        },
        {
          title: "Chronological Monthly Inflow Trend Line with Data Labels",
          problem: "Create a Line chart showing monthly investment volume across 2024 with clean data labels on high/low points.",
          scenario: "Tracking seasonal investment surges.",
          instructions: "1. Insert Line chart.\n2. X-axis: `Dim_Date[Month]`, Y-axis: `[Total Inflow Volume]`.\n3. Turn on Data labels > Options > Label density.\n4. Soften X/Y gridlines to light grey (#E0E0E0).",
          expectedOutput: "Uncluttered monthly trend line chart.",
          hint: "Format visual > Gridlines > Horizontal > Color: light grey.",
          solution: "Line chart formatted with soft gridlines and high-contrast data labels."
        }
      ],
      assignment: {
        title: "Weekly Assessment 5: Comprehensive FinTech Visual Canvas",
        scenario: "Synthesize Weeks 1–5 modeling, DAX, and visualization capabilities into a polished executive dashboard page.",
        deliverable: "Build Page 1 of the report with:\n1. Header: Dark blue banner with platform logo, title, and last refresh timestamp.\n2. Top KPI Strip: 4 Cards (Total Inflow, Active Investors, Success Rate %, MoM Growth %) with trend callouts.\n3. Left Visual: Line Chart of Monthly Inflow Volume with YTD cumulative trend.\n4. Right Visual: Horizontal Clustered Bar Chart of Top 5 Mutual Funds by Volume.\n5. Bottom Visual: Gateway SLA Performance Matrix with conditional formatting icons (Green circle for >95%, Red diamond for <90%).",
        completionCriteria: "Cohesive dark-theme canvas adhering to professional visual hierarchy with zero visual clutter."
      },
      assessment: {
        mcqs: [
          { question: "Why are horizontal bar charts preferred over vertical column charts when displaying categories with long text names (e.g. Fund Names)?", options: ["Horizontal bars calculate faster.", "Horizontal bars provide ample space for long text labels to be read naturally from left to right without diagonal tilting or truncation.", "Horizontal bars only work with text.", "Vertical columns are deprecated."], correct: 1, explanation: "Diagonal or truncated labels on vertical column charts slow down reading speed. Horizontal bar charts allow long labels to read horizontally without clutter." },
          { question: "What is the primary danger of using pie charts with 10 or more slices in business reports?", options: ["They consume excessive printer ink.", "The human eye cannot accurately compare slight angular variations between thin slices, obscuring meaningful differences between categories.", "Pie charts only work with positive integers.", "Power BI disables pie charts."], correct: 1, explanation: "Cognitive research shows humans struggle to compare angles and 2D areas accurately. Slices blur together, obscuring ranking and proportions." },
          { question: "What is 'Semantic Color Coding' in data visualization?", options: ["Using bright neon colors everywhere.", "Assigning colors that carry intuitive, culturally understood meanings (e.g. Green for positive growth/success, Red for failure/risk, Grey for neutral background context).", "Using only black and white.", "Coloring charts based on company logos."], correct: 1, explanation: "Semantic colors leverage universal intuition (Green = good, Red = alert/bad, Grey = neutral benchmark), reducing visual interpretation time." },
          { question: "What property should you adjust to prevent gridlines from overpowering data in a chart visual?", options: ["Gridline Thickness to 5px", "Gridline Color to a subtle, soft grey (or turn gridlines off entirely)", "Chart Transparency to 100%", "Delete the axis"], correct: 1, explanation: "Heavy dark gridlines constitute 'chart junk'. Softening them to very light grey directs visual focus to the data points." },
          { question: "How do you apply conditional formatting data bars to a Matrix column in Power BI Desktop?", options: ["Write an IF statement in DAX.", "In the visual Format pane, navigate to 'Cell elements', select the metric, and toggle 'Data bars' on.", "Use Paint in Windows.", "Right-click the measure in the Fields pane."], correct: 1, explanation: "Cell elements in the visual format pane allows toggling data bars, background colors, and icons directly on matrix columns." }
        ],
        scenarios: [
          { question: "How do you ensure a dashboard is accessible to users with red-green color blindness?", solution: "Avoid relying solely on red and green to convey status. Combine colors with distinct shapes/icons (e.g. green circle vs red diamond) or use accessible blue-orange color palettes. Ensure text callouts explicitly state positive or negative numbers." },
          { question: "What is the 5-Second Rule in executive dashboard design?", solution: "A senior stakeholder should be able to look at the dashboard and answer three core questions within 5 seconds: 1) How are we doing? (KPI cards), 2) What is the trend? (Line charts), and 3) Where is the problem? (Conditional formatting alerts)." },
          { question: "Why should you avoid placing 15 different small visual charts on a single dashboard page?", solution: "Visual clutter causes cognitive overload. Stakeholders cannot identify what matters most. Best practice is to limit each page to 4-6 high-impact visuals organized by clear visual hierarchy (summary at top, details at bottom)." }
        ],
        miniAssignment: "Create a clustered column chart in Power BI, add data labels, and format the column colors using a custom hex code."
      }
    },

    // DAY 36
    {
      day: 36, phase: "Power BI", phaseId: 2,
      title: "Interactive Navigation: Slicers, Bookmarks & Drill-Throughs",
      difficulty: "Intermediate-Advanced", duration: 180,
      objectives: [
        "Master modern interactive Slicers: Dropdown, Vertical List, Tile, and Relative Date filtering.",
        "Implement Synchronized Slicers (Sync Slicers) across multi-page report architectures.",
        "Configure Bookmarks and Selection Pane to create interactive toggle views (e.g. Volume View vs Count View).",
        "Build Page Drill-Throughs allowing users to right-click a mutual fund or gateway and jump to a granular audit page."
      ],
      prerequisites: "Day 35 visual storytelling and layout design.",
      expectedOutcome: "An interactive, application-like reporting experience where users can toggle views, clear filters with one click, and drill into granular customer transactions.",
      topics: [
        {
          concept: "Bookmarks & The Selection Pane",
          what: "A Bookmark captures the exact state of a report page (filters, slicers, visual visibility, and sort orders). The Selection pane controls which visual layers are hidden or visible.",
          why: "Instead of creating 10 separate report pages, bookmarks allow you to create interactive buttons on a single page: e.g. 'View as Chart' vs 'View as Table'.",
          how: "View tab > Check Bookmarks and Selection. Hide Visual B, show Visual A > Add Bookmark 'Show Chart'. Reverse and add Bookmark 'Show Table'. Link to buttons.",
          example: "A toggle switch switching a chart from 'Gross Volume' to 'Net Payout'.",
          businessCase: "Executive interactive presentation allowing leaders to toggle between high-level summary and granular operational detail without leaving the screen.",
          pitfalls: "Forgetting to uncheck 'Data' on a display-toggle bookmark, which accidentally resets user slicer selections when clicked."
        },
        {
          concept: "Report Drill-Through Pages",
          what: "A Drill-Through page is a destination detail page that automatically filters to whatever entity the user right-clicks on a summary page.",
          why: "Executive dashboards shouldn't clutter the main screen with 50-column transaction details. Drill-through lets stakeholders inspect individual customer records on demand.",
          how: "Create detail page > Drag `Dim_MutualFund[Fund_Name]` into 'Drill-through fields' well. On summary page, right-click any fund bar > Drill-through > Detail Page.",
          example: "Right-clicking 'HDFC Top 100 Fund' jumps to a customer demographic breakdown page filtered strictly to that fund.",
          businessCase: "Operations investigation workflow: isolating why a specific mutual fund had a 15% spike in failed debits.",
          pitfalls: "Failing to add a visible 'Back Button' on the destination drill-through page, trapping users on the detail screen."
        }
      ],
      resources: [
        { title: "Power BI Bookmarks & Selection Pane Masterclass", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Power+BI+Bookmarks+Selection+Pane", time: "25 mins", covers: "Creating toggle views, buttons, and pop-up filter panels." },
        { title: "Set Up Drill-Through in Power BI Reports Official Guide", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-drillthrough", time: "20 mins", covers: "Drill-through filters, cross-report drillthrough, and back buttons." },
        { title: "Sync Slicers and Multi-Page Navigation", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+BI+Sync+Slicers+Navigation", time: "25 mins", covers: "Synchronizing slicers and building top navigation bars." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 35 visual hierarchy and KPI card strips." },
        { time: "50 mins", activity: "Concept Study: Study Bookmarks, Selection pane, Drill-Throughs, and Sync Slicers." },
        { time: "25 mins", activity: "Guided Practice: Replicate chart/table toggle bookmarks and drill-through pages." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 navigation challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build Interactive Navigation & Drill-Through Subsystem." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 36 assessment questions." }
      ],
      exercises: [
        {
          title: "Create a Chart vs Table Toggle Using Bookmarks",
          problem: "On a single canvas space, build a toggle button switching between a Monthly Volume Line Chart and a Monthly Summary Table.",
          scenario: "Allowing visual leaders to see trends and finance leaders to see exact numbers.",
          instructions: "1. Place Line Chart and Table on top of each other.\n2. In Selection pane, hide Table, show Chart > Add Bookmark 'View Chart' (uncheck Data).\n3. In Selection pane, hide Chart, show Table > Add Bookmark 'View Table' (uncheck Data).\n4. Insert two buttons and link action to bookmarks.",
          expectedOutput: "Buttons seamlessly toggling between visual representations.",
          hint: "Remember to uncheck 'Data' in bookmark properties so slicer filters are preserved.",
          solution: "Interactive bookmark toggle working smoothly with preserved slicer state."
        },
        {
          title: "Build a Dedicated Scheme Detail Drill-Through Page",
          problem: "Create Page 2 named `Fund_Audit_Detail`. Configure drill-through on `Dim_MutualFund[Fund_Name]`.",
          scenario: "Enabling granular customer audit for any specific mutual fund scheme.",
          instructions: "1. Create Page 2: `Fund_Audit_Detail`.\n2. Drag `Dim_MutualFund[Fund_Name]` into Page settings > Drill-through.\n3. Add a table showing Customer Name, Amount, Status, and Date.\n4. Add automated Back Button.",
          expectedOutput: "Functional drill-through page automatically filtered to clicked fund.",
          hint: "Drag field into 'Drill-through' section in Format Page.",
          solution: "Drill-through page active; right-clicking any fund on Page 1 navigates to Page 2."
        },
        {
          title: "Synchronize Date Range Slicers Across Pages",
          problem: "Ensure that selecting a Date Range on Page 1 automatically updates Page 2 and Page 3.",
          scenario: "Maintaining consistent temporal filter context across the entire report.",
          instructions: "1. Select Date Slicer on Page 1.\n2. View tab > Sync slicers pane.\n3. Check both 'Visible' and 'Sync' icons for Page 1, Page 2, and Page 3.",
          expectedOutput: "Slicers synchronized across all report tabs.",
          hint: "View tab > Sync slicers > Check sync boxes.",
          solution: "Date filter synchronized globally across all report pages."
        }
      ],
      assignment: {
        title: "FinTech Interactive Navigation & Operational Drill-Through Subsystem",
        scenario: "Upgrade the FinTech report into an intuitive web application with app-like navigation.",
        deliverable: "1. Insert top navigation bar with page buttons: '01 Executive Overview', '02 Operations Cockpit'.\n2. Add 'Reset All Filters' button linked to a clean-slate bookmark.\n3. Add a slide-out Filter Panel using Bookmarks and Selection pane.\n4. Configure Fund Drill-Through page displaying investor demographics, recent failure logs, and gateway breakdown.\n5. Confirm back buttons navigate seamlessly back to Page 1.",
        completionCriteria: "Polished user experience with working navigation buttons, synchronized slicers, and verified drill-throughs."
      },
      assessment: {
        mcqs: [
          { question: "What property should you UNCHECK on a bookmark that is designed only to toggle visual visibility (e.g. showing/hiding a chart)?", options: ["Display", "Data", "Current page", "All visuals"], correct: 1, explanation: "Unchecking 'Data' ensures the bookmark only alters visual visibility (Selection pane) without resetting the user's active slicers and filters." },
          { question: "How do users navigate to a Drill-Through page in Power BI?", options: ["By double clicking the canvas.", "By right-clicking a data point on a summary chart and selecting 'Drill-through' > Destination Page.", "By exporting to PDF.", "By refreshing the report."], correct: 1, explanation: "Users right-click a visual data point (like a bar or matrix row) and choose Drill-through from the context menu." },
          { question: "What is the purpose of the 'Sync Slicers' pane in Power BI Desktop?", options: ["To sync with mobile phones.", "To control which pages a slicer appears on and ensure filter selections made on one page apply to other pages automatically.", "To format fonts across pages.", "To speed up data refresh."], correct: 1, explanation: "Sync Slicers allows a single slicer to synchronize its filter state across multiple report pages simultaneously." },
          { question: "Which pane in Power BI Desktop allows you to rename visuals, reorder layers, and hide/unhide specific charts?", options: ["Bookmarks pane", "Selection pane", "Format pane", "Performance Analyzer"], correct: 1, explanation: "The Selection pane lists all visual elements on the current canvas, allowing you to hide, show, reorder Z-index layers, and rename them." },
          { question: "What automatically appears on a page when you add a Drill-Through field to it?", options: ["A pie chart", "An automated Back Button (left arrow) that navigates back to the originating page", "A congratulations message", "A password lock"], correct: 1, explanation: "Power BI automatically inserts a Back Button in the top left corner when a drill-through field is configured." }
        ],
        scenarios: [
          { question: "A user clicks a bookmark button to open a 'Help Panel' and complains that all their date slicer selections were wiped back to January. What was the developer's mistake?", solution: "The developer left the 'Data' option checked on the bookmark. When clicked, the bookmark restored the saved filter state from when the bookmark was recorded. To fix, right-click the bookmark, uncheck 'Data', and click 'Update'." },
          { question: "How can you use Bookmarks to create a 'Clear All Filters' button for executive users?", solution: "Set all slicers on the page to their default unfiltered state. Add a Bookmark named 'Reset Filters' with only 'Data' checked. Insert a button, set its action to Bookmark > 'Reset Filters', and style it with an eraser or reset icon." },
          { question: "Why is building a dedicated drill-through page superior to squeezing all detailed transaction tables onto the main executive overview page?", solution: "The executive page stays uncluttered, focused on high-level KPIs and trends, and loads in milliseconds. Squeezing massive detailed tables onto the main page creates visual noise and causes slow visual query rendering." }
        ],
        miniAssignment: "Create two buttons on a canvas: 'View Sales' and 'View Profit', and link them to respective bookmarks toggling visual displays."
      }
    },

    // DAY 37
    {
      day: 37, phase: "Power BI", phaseId: 2,
      title: "Dashboard Development Page 1: Executive SIP & Revenue Performance",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Synthesize all Phase 3 competencies into Page 1 of the capstone Power BI project.",
        "Implement executive grid layouts with standardized margins, header banners, and KPI scorecards.",
        "Construct core financial visuals: Monthly Inflow Trend (Combo Chart), Asset Allocation (Matrix), and Top Fund Schemes (Bar Chart).",
        "Incorporate Time Intelligence indicators (YTD Inflow, MoM Growth % badges) into high-impact visual cards."
      ],
      prerequisites: "Days 26-36 modeling, DAX, and navigation.",
      expectedOutcome: "A completed, executive-ready Page 1 of the FinTech Investment Operations Dashboard ready for C-suite presentation.",
      topics: [
        {
          concept: "Executive Canvas Grid & Layout Strategy",
          what: "A structured visual grid dividing the 16:9 canvas into 3 functional zones: 1) Top: Header & Global KPI Cards; 2) Center: Macro Trends (Monthly Inflow & YoY Growth); 3) Bottom: Multi-dimensional breakdown (Asset Categories & Top Schemes).",
          why: "Executive attention follows a 'Z-pattern' or 'F-pattern' scan. Key numbers must be immediate; analytical depth follows below.",
          how: "Use container cards with subtle background shading (#121d2e), 12px rounded borders, and clean contrast with the deep navy background (#0b1220).",
          example: "4 KPI cards across top, Combo Chart on left taking 60% width, Top Schemes Bar Chart on right taking 40% width.",
          businessCase: "C-suite dashboard presented monthly to Chief Executive Officer and Head of Investments.",
          pitfalls: "Placing charts with different margins and misaligned edges, making reports look amateurish."
        },
        {
          concept: "Executive Data Storytelling & Visual Hierarchy",
          what: "Ensuring every visual on the page directly contributes to answering core business performance questions: Are we growing? Which products drive revenue? Are targets met?",
          why: "Dashboards are not art galleries; they are decision-support engines that justify marketing spend and operational investments.",
          how: "Use dynamic titles (e.g. `\"Total Inflow: ₹\" & FORMAT([Inflow (Cr)], \"0.00\") & \" Cr (\" & FORMAT([MoM Growth %], \"+0.0%\") & \")\"`).",
          example: "Highlighting the top-performing fund bar in emerald green while styling standard funds in neutral blue.",
          businessCase: "Demonstrating that Equity funds drove 68% of quarterly growth while Debt funds stagnated.",
          pitfalls: "Failing to format raw numbers into readable financial units (e.g. displaying 14258910.42 instead of ₹1.43 Cr)."
        }
      ],
      resources: [
        { title: "Design an Executive Dashboard in Power BI from Scratch", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Design+an+Executive+Dashboard+Power+BI", time: "35 mins", covers: "Layout grids, executive storytelling, custom palettes, and card design." },
        { title: "Power BI Dashboard Layout & Container Best Practices", platform: "Curibal", url: "https://www.youtube.com/results?search_query=Power+BI+Container+Card+Design+Curibal", time: "20 mins", covers: "Rounded corners, card alignment, and visual hierarchy." },
        { title: "Financial Dashboard Formatting Standards", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-design-tips-for-reports", time: "20 mins", covers: "Official guidance on report design and visual storytelling." }
      ],
      timetable: [
        { time: "15 mins", activity: "Sprint Review: Check data model relationships, DAX measures, and canvas settings." },
        { time: "50 mins", activity: "Canvas Construction: Build dark-theme header, navigation bar, and 4 KPI container cards." },
        { time: "25 mins", activity: "Macro Trend Visual: Build Monthly Inflow Combo Chart with YTD cumulative secondary line." },
        { time: "30 mins", activity: "Product Breakdown: Build Top 5 Mutual Funds horizontal bar chart with custom accent coloring." },
        { time: "40 mins", activity: "Tabular Matrix: Build Asset Category Performance Matrix with embedded data bars." },
        { time: "20 mins", activity: "Audit & Validation: Verify responsive visual cross-filtering and number formatting." }
      ],
      exercises: [
        {
          title: "Build the Top-Row KPI Scorecard Block",
          problem: "Construct 4 aligned KPI cards: 1) Total Inflow Volume (₹ Cr), 2) Active Investors, 3) Active SIP Mandates, 4) MoM Volume Growth % with dynamic trend icon.",
          scenario: "Executive summary header block.",
          instructions: "1. Place 4 cards evenly across top.\n2. Bind measures from `_Key Measures`.\n3. Format callouts consistently: Font 26pt bold, clean label below.\n4. Align top edges using Format > Align Top.",
          expectedOutput: "Four aligned executive summary cards.",
          hint: "Format > Align > Distribute Horizontally.",
          solution: "Top KPI strip perfectly aligned with verified formatting."
        },
        {
          title: "Construct Macro Monthly Inflow Combo Chart",
          problem: "Build a dual-axis visual showing monthly investment volume (Columns) and cumulative YTD volume (Line on secondary axis).",
          scenario: "Tracking annual progress toward corporate target.",
          instructions: "1. Insert Line and Clustered Column Chart.\n2. X-axis: `Dim_Date[Month]`.\n3. Column Y-axis: `[Total Inflow Volume]`.\n4. Line Y-axis: `[Inflow YTD]`.\n5. Enable data labels on columns.",
          expectedOutput: "Dual-axis financial momentum chart.",
          hint: "Line and Clustered Column Chart with YTD on Line Y-axis.",
          solution: "Combo chart constructed with synchronized temporal axis."
        },
        {
          title: "Top 5 Schemes Horizontal Ranking Bar Chart",
          problem: "Create a horizontal bar chart displaying the Top 5 mutual funds by volume, with the #1 scheme highlighted in emerald green (#43d19e).",
          scenario: "Spotlighting the flagship revenue driver.",
          instructions: "1. Insert Clustered Bar chart.\n2. Y-axis: `Dim_MutualFund[Fund_Name]`, X-axis: `[Total Inflow Volume]`.\n3. Filter pane > Top N: Top 5 by `[Total Inflow Volume]`.\n4. Colors > Conditional formatting: Green for highest, subtle blue for others.",
          expectedOutput: "Ranked horizontal bar chart spotlighting the top fund.",
          hint: "Filter pane > Filter type: Top N > Value: 5 by Total Inflow Volume.",
          solution: "Top 5 chart constructed with dynamic accent coloring on #1 scheme."
        }
      ],
      assignment: {
        title: "Page 1 Capstone Delivery: Executive SIP & Revenue Performance Canvas",
        scenario: "Complete Page 1 of the capstone project in `FinTech_Operations_Dashboard.pbix`.",
        deliverable: "Deliver fully functioning Page 1:\n1. Title: 'Executive SIP & Revenue Performance'.\n2. 4 Top KPI Cards with dynamic formatting.\n3. Macro Combo Chart (Monthly Volume vs YTD Inflow).\n4. Top 5 Schemes Bar Chart.\n5. Category Allocation Matrix with % Market Share and Data Bars.\n6. Interactive Slicers for Calendar Year and Customer Tier.\n7. All charts linked, tested, and validated.",
        completionCriteria: "Production-grade single-screen canvas adhering to dark-theme design standards with zero visual glitches."
      },
      assessment: {
        mcqs: [
          { question: "What is the recommended maximum number of primary visual charts on a single executive dashboard page?", options: ["15 to 20", "4 to 6 focused visuals", "1 visual only", "As many as can fit"], correct: 1, explanation: "Limiting a dashboard page to 4-6 high-impact visuals prevents cognitive fatigue and ensures decision-makers focus on core strategic insights." },
          { question: "How do you filter a visual to show strictly the 'Top 5' items by a measure in Power BI?", options: ["Write an SQL query.", "In the visual's Filter pane, set 'Filter type' to 'Top N', enter '5', and drag the ranking measure into 'By value'.", "Delete the bottom rows.", "Use a slicer."], correct: 1, explanation: "The Top N filter in the visual filter pane dynamically restricts results to the top N entities evaluated by the specified measure." },
          { question: "Why should financial amounts in excess of ₹1 Crore be formatted with short units (e.g. ₹4.2 Cr) on executive cards?", options: ["Numbers larger than 10 digits crash Power BI.", "Displaying 8-digit raw numbers (₹42,108,912) forces executives to count commas, slowing comprehension. Short units enable instantaneous scanning.", "It saves disk space.", "Power BI only supports thousands."], correct: 1, explanation: "Executive cards require instant cognitive processing. Truncating large numbers to clean financial units (M, B, Cr, L) enables rapid interpretation." },
          { question: "How do you ensure multiple cards on a page are aligned with exact precision in Power BI Desktop?", options: ["Eyeball them by hand.", "Select all cards, go to the Format ribbon > Align > click 'Align Top', then click 'Distribute Horizontally'.", "Use Windows Paint.", "Lock the computer."], correct: 1, explanation: "The Format > Align tools automatically enforce mathematical pixel alignment and equal horizontal/vertical spacing across elements." },
          { question: "What does Cross-Highlighting do when a user clicks a bar in a chart visual?", options: ["Deletes the other visuals.", "Filters or highlights related portions of data in all other visuals on the canvas based on the clicked category.", "Opens a web browser.", "Refreshes the database."], correct: 1, explanation: "Interactive cross-filtering/cross-highlighting dynamically recalculates related visuals based on clicked data points." }
        ],
        scenarios: [
          { question: "A stakeholder clicks 'Equity' on the category bar chart and asks why the KPI cards at the top didn't change. What is the cause?", solution: "Visual interactions were likely set to 'None'. Click the category bar chart, go to the Format ribbon > 'Edit interactions', and ensure the icon above the KPI cards is set to 'Filter' (filter funnel icon) rather than 'None' (slashed circle)." },
          { question: "How do you implement a dynamic chart title in Power BI that changes based on active slicer selections?", solution: "Author a DAX measure: `[Dynamic Title] = \"Monthly Volume Trend - \" & SELECTEDVALUE(Dim_MutualFund[Category], \"All Categories\")`. In the chart's Format pane > Title > click the 'fx' conditional formatting button and select your dynamic title measure." },
          { question: "Why should you lock visual objects (View tab > Lock objects) before saving your final report?", solution: "Locking objects prevents users from accidentally nudging charts out of alignment or resizing containers when clicking around the canvas during presentations." }
        ],
        miniAssignment: "In Power BI Desktop, format a visual container with a custom background color, 12px rounded corners, and a subtle border."
      }
    },

    // DAY 38
    {
      day: 38, phase: "Power BI", phaseId: 2,
      title: "Dashboard Development Page 2: Operations, Payment Gateway & Failure Analysis",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Synthesize operational failure analytics into Page 2: 'Operations & Gateway Health'.",
        "Construct root-cause failure visuals: Failure Reasons Pareto Breakdown and Gateway Error Distributions.",
        "Implement vendor SLA monitoring matrix comparing Razorpay, Cashfree, and PayU against contracted uptime benchmarks.",
        "Build automated operational alert callouts for bank nodal maintenance spikes."
      ],
      prerequisites: "Day 37 Page 1 completion and operational error measures.",
      expectedOutcome: "A completed, mission-critical Page 2 Operations Cockpit providing technical operations leads with real-time root-cause diagnostic capabilities.",
      topics: [
        {
          concept: "Operational Failure Root-Cause Architecture",
          what: "Decomposing aggregate failure rates into distinct operational error taxonomies: Bank Nodal Outages, Insufficient Funds, Mandate Expired, and Network Timeouts.",
          why: "Saying 'Failures increased by 4%' is useless to engineering. Operations needs to know: '82% of failures this weekend were caused by HDFC bank nodal maintenance, not our payment app.'",
          how: "Build a horizontal bar chart of `Error_Reason` ranked by volume loss, paired with a Gateway SLA comparison matrix.",
          example: "Isolating 'Insufficient Funds' (customer issue) from 'Gateway Timeout' (vendor SLA breach).",
          businessCase: "Claiming SLA penalty credits from payment gateway providers for downtime exceeding contracted limits.",
          pitfalls: "Lumping all failed transactions into a single generic 'Failed' bucket without capturing granular error response codes."
        },
        {
          concept: "Vendor SLA Performance Matrix & Status Rules",
          what: "A specialized operational matrix evaluating each gateway across 4 metrics: Total Transactions, Successful Volume, Technical Error Count, and Contracted SLA Compliance %.",
          why: "Procurement and Treasury teams require objective data to negotiate payment processing fees and re-route transaction volumes.",
          how: "Rows: `Dim_Gateway[Gateway_Name]`; Columns: `[Total Txns]`, `[Success Rate %]`, `[SLA Breach Flag]`. Conditional formatting: Red alert icons when SLA < 95%.",
          example: "Matrix clearly highlighting that Cashfree maintained 98.4% uptime while PayU slipped to 89.2% during peak festive hours.",
          businessCase: "Automated payment routing: dynamically shifting volume to the highest-uptime gateway rail.",
          pitfalls: "Evaluating SLA performance on gross volume rather than transaction attempt counts."
        }
      ],
      resources: [
        { title: "Build an Operations & Monitoring Dashboard in Power BI", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Operations+Monitoring+Dashboard+Power+BI", time: "30 mins", covers: "Operational metrics, failure breakdowns, and SLA tracking." },
        { title: "Pareto Analysis & Root Cause Charts in Power BI", platform: "Curibal", url: "https://www.youtube.com/results?search_query=Power+BI+Pareto+Analysis+Chart+Curibal", time: "25 mins", covers: "80/20 rule, cumulative error percentages, and bar charts." },
        { title: "Advanced Conditional Formatting for Operational Alerts", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting", time: "20 mins", covers: "Threshold rules, icon sets, and status callouts." }
      ],
      timetable: [
        { time: "15 mins", activity: "Sprint Review: Check operational DAX measures and error taxonomies." },
        { time: "50 mins", activity: "Canvas Construction: Set up Page 2 layout with dark theme container grid." },
        { time: "25 mins", activity: "Failure Breakdown Visual: Build horizontal bar chart of Error Reasons." },
        { time: "30 mins", activity: "Vendor SLA Matrix: Construct Gateway Health Matrix with conditional status icons." },
        { time: "40 mins", activity: "Bank Outage Diagnostic: Build Bank-level failure rate comparison table." },
        { time: "20 mins", activity: "Audit & Cross-Page Linking: Link Page 1 and Page 2 with top navigation buttons." }
      ],
      exercises: [
        {
          title: "Build the Error Reason Root-Cause Horizontal Bar Chart",
          problem: "Construct a horizontal bar chart displaying total lost volume broken down by `Error_Reason`, sorted from highest to lowest.",
          scenario: "Isolating which error types cause the greatest financial revenue leakage.",
          instructions: "1. Insert Clustered Bar chart.\n2. Y-axis: `Fact_Transactions[Error_Reason]`.\n3. X-axis: `[Failed Transaction Volume]`.\n4. Format bars with alert amber (#f4bd63) color.",
          expectedOutput: "Ranked root-cause failure chart.",
          hint: "Filter out 'SUCCESS' status so only actual error codes appear.",
          solution: "Horizontal failure chart constructed showing primary leakage causes."
        },
        {
          title: "Construct Payment Gateway SLA Health Matrix",
          problem: "Build an operational matrix comparing Razorpay, Cashfree, and PayU with conditional status icons.",
          scenario: "Vendor partner monitoring cockpit.",
          instructions: "1. Insert Matrix.\n2. Rows: `Dim_Gateway[Gateway_Name]`.\n3. Values: `[Total Transactions]`, `[Payment Success Rate %]`, `[Failed Transaction Volume]`.\n4. Apply Icon conditional formatting: Green circle for >=95%, Red circle for <95%.",
          expectedOutput: "Vendor scorecard with immediate status flags.",
          hint: "Cell elements > Icons > Rules > If Value >= 0.95 Green, Else Red.",
          solution: "SLA Matrix configured with automated threshold status icons."
        },
        {
          title: "Build Bank-Level Failure Rate Breakdown",
          problem: "Create a table showing customer Bank Names and their respective failure rates, identifying bank-specific outages.",
          scenario: "Identifying whether failures stem from specific customer banks.",
          instructions: "1. Insert Table visual.\n2. Columns: `Bank_Name`, `[Total Transactions]`, `[Payment Success Rate %]`.\n3. Sort by Success Rate ascending to bring worst-performing banks to the top.",
          expectedOutput: "Ranked bank failure table highlighting bank downtime.",
          hint: "Sort column: click header of Success Rate %.",
          solution: "Bank outage diagnostic table assembled and sorted by lowest uptime."
        }
      ],
      assignment: {
        title: "Page 2 Capstone Delivery: Operations, Payment Gateway & Failure Cockpit",
        scenario: "Complete Page 2 of the capstone project in `FinTech_Operations_Dashboard.pbix`.",
        deliverable: "Deliver fully functioning Page 2:\n1. Title: 'Payment Operations & Gateway Health Cockpit'.\n2. Top Row: 4 Operational KPI Cards (Failed Txn Count, Lost Volume ₹, Technical Error Rate %, Recovery Rate %).\n3. Middle Left: Error Reason Root-Cause Horizontal Bar Chart.\n4. Middle Right: Gateway SLA Compliance Matrix with conditional status icons.\n5. Bottom: Bank-level Failure Breakdown Table.\n6. Synchronized Date Slicers and Top Navigation Bar linking Page 1 and Page 2.",
        completionCriteria: "Mission-critical operations cockpit fully functional with verified cross-page navigation."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary business objective of Page 2 (Operations Cockpit) compared to Page 1 (Executive Overview)?", options: ["Page 2 is for printing on paper.", "Page 1 answers strategic high-level performance questions; Page 2 provides granular root-cause diagnostics to identify why failures occur and monitor vendor SLAs.", "Page 2 is a backup copy of Page 1.", "Page 2 only shows dates."], correct: 1, explanation: "Page 1 serves executive decision-makers with strategic growth metrics; Page 2 serves operational and engineering teams with diagnostic root-cause intelligence." },
          { question: "How does categorizing failure reasons (e.g. Insufficient Funds vs Bank Nodal Outage) protect vendor relationships?", options: ["It confuses the vendor.", "It separates customer-side issues (insufficient balance) from vendor-side technical SLA breaches (gateway timeouts), preventing false penalty disputes.", "It automatically refunds customers.", "It disables failed gateways."], correct: 1, explanation: "Accurate error taxonomy ensures vendors are held accountable strictly for their own technical downtime rather than customer balance deficiencies." },
          { question: "What visual element is most effective for displaying multi-metric vendor SLA performance scorecards?", options: ["Pie chart", "Matrix visual with conditional formatting icons and data bars", "Scatter plot", "Word cloud"], correct: 1, explanation: "A Matrix visual provides structured rows and columns for multiple metrics, while conditional formatting icons deliver immediate visual alert status." },
          { question: "How do you navigate between Page 1 and Page 2 using buttons in Power BI Desktop?", options: ["Hold Ctrl and click the configured button in Desktop (single click in published Service).", "Double click the canvas.", "Press Enter.", "Refresh the browser."], correct: 0, explanation: "In Power BI Desktop authoring mode, holding Ctrl and clicking an action button activates it; in the published web service, a standard single click activates navigation." },
          { question: "What is the purpose of testing a dashboard with synchronized slicers across multiple pages?", options: ["To change visual colors.", "To ensure that filtering a date range or customer segment on Page 1 seamlessly carries over when navigating to Page 2, maintaining analytical context.", "To export to PowerPoint.", "To speed up data refresh."], correct: 1, explanation: "Sync Slicers ensure that user filter context is preserved as stakeholders navigate between summary and diagnostic pages." }
        ],
        scenarios: [
          { question: "A payment operations lead notices a sudden 12% drop in platform success rate on Sunday morning. How does Page 2 enable immediate diagnosis?", solution: "The lead looks at Page 2: 1) The Error Reason chart shows 85% of failures are 'Bank Gateway Timeout', 2) The Bank Table reveals 95% of timeouts originated from 'HDFC Bank', and 3) The Gateway Matrix shows Razorpay and Cashfree both experienced the drop. Diagnosis: HDFC core banking maintenance downtime, not an internal platform bug." },
          { question: "How would you present this dashboard during an interview to showcase your Business Analyst capabilities?", solution: "Demonstrate the complete analytical story: start on Page 1 showing the ₹1.8 Cr monthly volume growth; highlight the 6.2% failure rate; seamlessly navigate to Page 2 to show the root-cause analysis isolating ₹11.2 Lakhs in lost volume from nodal bank downtime; and conclude with the business recommendation to implement an automated smart-routing fallback engine." },
          { question: "Why should you author DAX measures with explicit divide-by-zero protection (`DIVIDE(..., 0)`) particularly on diagnostic pages?", solution: "On diagnostic pages, users frequently filter down to narrow edge cases (e.g. a specific bank on a single day). If that bank had zero transactions, standard division throws #DIV/0! or 'Infinity', breaking the UI. DIVIDE guarantees a clean 0% or BLANK." }
        ],
        miniAssignment: "Create a Matrix visual comparing 3 payment gateways across Total Volume, Failed Volume, and Failure Rate %, and apply conditional formatting rules."
      }
    },

    // DAY 39 (Phase 3 Exam)
    {
      day: 39, phase: "Power BI", phaseId: 2,
      title: "Phase 3 Comprehensive Examination: Power BI Architecture & Dashboard Capstone",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Evaluate comprehensive mastery across all Phase 3 competencies (Days 26–38).",
        "Test proficiency in Power Query ETL, Star Schema data modeling, DAX measures, Time Intelligence, and executive visualization design.",
        "Audit the completed two-page `FinTech_Operations_Dashboard.pbix` capstone project against production standards.",
        "Achieve the mandatory 75% examination pass mark to unlock Phase 4 (APIs and Postman)."
      ],
      prerequisites: "Completion of Days 26 through 38 modules and assignments.",
      expectedOutcome: "Certified Phase 3 Power BI completion badge and a fully functioning, two-page enterprise capstone dashboard ready for portfolio showcasing.",
      topics: [
        {
          concept: "Phase 3 Competency Synthesis & Architectural Audit",
          what: "Holistic evaluation of data ingestion, Power Query transformation, dimensional modeling, DAX formula performance, and UX navigation.",
          why: "In Power BI technical interviews, candidates are evaluated on their ability to explain the entire architectural pipeline from raw data to executive insight.",
          how: "Perform an end-to-end model audit: verify 1-to-Many relationships, check for unnecessary calculated columns, test DAX measures against edge cases, and run Performance Analyzer.",
          example: "Verifying that `Dim_Date` is properly marked as Date Table and all measures reside in `_Key Measures`.",
          businessCase: "Delivering an enterprise-ready BI reporting model capable of supporting hundreds of business users.",
          pitfalls: "Presenting reports with unformatted numbers, misaligned containers, or Many-to-Many relationship warnings."
        },
        {
          concept: "Performance Optimization & The Performance Analyzer",
          what: "Using Power BI's built-in Performance Analyzer (View tab > Performance Analyzer) to measure exact visual rendering times (DAX query time vs Visual display time).",
          why: "Executive dashboards must render in under 1.5 seconds. If a visual takes 6 seconds, stakeholders will abandon the report.",
          how: "Start Recording > Refresh visuals > Inspect DAX query duration and DirectQuery server times. Optimize slow measures with variables (VAR / RETURN).",
          example: "Refactoring a nested CALCULATE measure using DAX variables, reducing render time from 2,400ms to 280ms.",
          businessCase: "Ensuring fast mobile and desktop loading for executive leadership.",
          pitfalls: "Ignoring visual rendering bottlenecks before publishing reports to production workspaces."
        }
      ],
      resources: [
        { title: "Power BI Performance Optimization Guide", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/guidance/power-bi-optimization", time: "25 mins", covers: "Performance Analyzer, VertiPaq optimization, reducing visual count, and DAX tuning." },
        { title: "Top Power BI Interview Questions for Business Analysts", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Top+Power+BI+Interview+Questions", time: "35 mins", covers: "Live interview questions on DAX, modeling, RLS, and architectures." },
        { title: "Phase 3 Capstone Portfolio Review & Walkthrough", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Power+BI+Portfolio+Project+Review", time: "30 mins", covers: "Reviewing completed dashboards and explaining metrics to recruiters." }
      ],
      timetable: [
        { time: "15 mins", activity: "Phase 3 Speed Drill: Rapid DAX and modeling flashcards." },
        { time: "50 mins", activity: "Performance Audit: Run Performance Analyzer on both report pages and optimize slow visuals." },
        { time: "25 mins", activity: "Portfolio Polish: Verify typography, number formatting, tooltips, and slicer sync." },
        { time: "30 mins", activity: "Interview Presentation Practice: Rehearse a 5-minute executive walkthrough of both pages." },
        { time: "40 mins", activity: "Phase 3 Certification Exam: Complete the 25-question technical evaluation." },
        { time: "20 mins", activity: "Results Analysis & API Roadmap: Review missed questions and preview Phase 4 (APIs)." }
      ],
      exercises: [
        {
          title: "Run Performance Analyzer Audit",
          problem: "Use Power BI's Performance Analyzer to record rendering times for all visuals on Page 1 and Page 2. Identify any visual taking over 1,000ms.",
          scenario: "Pre-deployment production performance tuning.",
          instructions: "1. View tab > Check Performance Analyzer.\n2. Click 'Start recording' > Click 'Refresh visuals'.\n3. Expand top visual > Inspect DAX query time and Visual display time.\n4. Confirm all visuals render under 1,000ms.",
          expectedOutput: "Performance report verifying sub-second visual rendering times.",
          hint: "View > Performance Analyzer > Start Recording > Refresh Visuals.",
          solution: "Performance Analyzer audit completed with all visuals executing within optimal performance thresholds."
        },
        {
          title: "Optimize Measure Using DAX Variables (VAR / RETURN)",
          problem: "Refactor `[YoY Growth %]` using `VAR` and `RETURN` to eliminate redundant duplicate calculations of current and prior periods.",
          scenario: "Improving DAX formula efficiency.",
          instructions: "1. In DAX formula: define `VAR CurrentVol = [Total Inflow Volume]`, `VAR PriorVol = [Inflow SPLY]`.\n2. In `RETURN`: `DIVIDE(CurrentVol - PriorVol, PriorVol, 0)`.\n3. Verify results match original measure.",
          expectedOutput: "Optimized DAX measure using clean variable structure.",
          hint: "VAR stores the evaluated result in memory, avoiding re-calculation.",
          solution: "YoY Growth % = VAR CurrentVol = [Total Inflow Volume] VAR PriorVol = [Inflow SPLY] RETURN DIVIDE(CurrentVol - PriorVol, PriorVol, 0)"
        },
        {
          title: "Verify Complete Star Schema Integrity Check",
          problem: "Perform final schema audit in Model View: confirm 4 Dimension tables, 1 Fact table, 100% 1-to-Many relationships, and single cross-filter directions.",
          scenario: "Final pre-certification architectural sign-off.",
          instructions: "1. Switch to Model View.\n2. Verify `Dim_User`, `Dim_MutualFund`, `Dim_Gateway`, and `Dim_Date` connect to `Fact_Transactions`.\n3. Confirm zero Many-to-Many links and zero bidirectional relationships.",
          expectedOutput: "Certified Kimball Star Schema model.",
          hint: "Model View diagram visual inspection.",
          solution: "Star Schema validated against all enterprise architectural standards."
        }
      ],
      assignment: {
        title: "Phase 3 Certification Examination: Capstone Dashboard Audit",
        scenario: "Complete the comprehensive 25-question technical exam covering Power BI architecture, data modeling, DAX, Time Intelligence, and report design.",
        deliverable: "1. Complete all 5 assessment MCQs (passing mark >= 75%).\n2. Solve the 3 advanced Power BI scenario challenges.\n3. Save and archive the completed `FinTech_Operations_Dashboard.pbix` capstone file.\n4. Log completion badge in your personal dashboard.",
        completionCriteria: "Attain >= 75% on the certification assessment and successfully log completion in your dashboard."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary technical benefit of using variables (VAR / RETURN) inside complex DAX measures?", options: ["It encrypts the formula.", "Variables are evaluated once and cached in memory, preventing redundant re-evaluations of expensive expressions and making code easier to read and debug.", "Variables make the file smaller.", "Variables allow Excel export."], correct: 1, explanation: "Variables evaluate once and store the result in memory, significantly boosting DAX performance and simplifying formula readability." },
          { question: "Which tool in Power BI Desktop records exact millisecond rendering durations for each visual on a canvas?", options: ["DAX Studio", "Performance Analyzer (View tab > Performance Analyzer)", "Task Manager", "Query Diagnostics"], correct: 1, explanation: "The built-in Performance Analyzer measures and displays the exact duration required to evaluate DAX queries and render visual elements." },
          { question: "Why does Power BI's VertiPaq engine compress Star Schema dimensional models up to 10x more efficiently than flat 50-column tables?", options: ["Star schemas are stored in the cloud.", "Columnar databases compress low-cardinality repetitive dictionary data in dimension tables and store narrow integer keys in fact tables, maximizing Run-Length Encoding efficiency.", "Flat tables are converted to images.", "Power BI uses zip compression."], correct: 1, explanation: "VertiPaq is a columnar in-memory database that excels at compressing normalized dimension tables and integer foreign keys via dictionary and run-length encoding." },
          { question: "What happens if you publish a report to Power BI Service that has an inactive relationship between Fact_Transactions and Dim_Date?", options: ["The report cannot be published.", "The inactive relationship remains available and can be utilized dynamically by any measure that invokes the USERELATIONSHIP() function.", "Power BI deletes the relationship.", "The file crashes."], correct: 1, explanation: "Inactive relationships are fully supported and can be dynamically activated inside specific DAX measures using USERELATIONSHIP()." },
          { question: "In executive dashboard design, what is the 'Z-pattern' or 'F-pattern' scanning principle?", options: ["A keyboard shortcut.", "Eye-tracking research showing that business stakeholders scan screens starting from the top-left, moving across the top, and scanning downward, meaning highest-priority KPIs belong at the top.", "A chart type.", "A data sorting algorithm."], correct: 1, explanation: "Cognitive eye-tracking studies demonstrate that readers scan top-left to top-right first, making the top banner and upper cards the most valuable real estate on the canvas." }
        ],
        scenarios: [
          { question: "In an interview, the hiring manager asks: 'How would you explain the difference between a measure and a calculated column to a non-technical product manager?' How do you answer?", solution: "I explain using an analogy: A calculated column is like writing a permanent number in ink on every single receipt in a filing cabinet—it takes up permanent physical space and never changes. A measure is like a calculator sitting on your desk—it takes up zero space, and whenever you ask 'What were total sales last week in Mumbai?', it calculates the exact answer instantly on demand based on whatever question you are asking." },
          { question: "How do you explain your decision to separate your FinTech report into Page 1 (Executive Performance) and Page 2 (Operations Cockpit)?", solution: "Different stakeholders have different cognitive needs. The CEO and VP of Product need high-level strategic pulse checks (AUM growth, top schemes, market share) and don't want technical error noise. The Operations Lead and Engineering team need granular root-cause diagnostics (gateway SLAs, bank-specific timeouts, recovery rates). Separating them optimizes clarity for both audiences." },
          { question: "How will your Power BI mastery in Phase 3 connect with the API and Postman testing you will learn in Phase 4?", solution: "Modern business intelligence systems frequently ingest data directly from REST APIs (like payment gateway webhooks or transaction status endpoints). Understanding how APIs structure JSON payloads, status codes, and HTTP responses allows a Business Analyst to bridge the gap between engineering backend data feeds and Power BI executive reporting." }
        ],
        miniAssignment: "Review all Phase 3 concepts, save a safe backup copy of your Power BI .pbix file, and prepare your workspace for Phase 4: APIs and Postman."
      }
    },

    // DAY 40
    {
      day: 40, phase: "APIs & Postman", phaseId: 3,
      title: "Client-Server Architecture & HTTP Fundamentals",
      difficulty: "Beginner", duration: 180,
      objectives: [
        "Master the Client-Server model: Clients (web browsers, mobile apps), Servers (backends), and Gateways.",
        "Understand the Request-Response lifecycle: DNS resolution, TCP handshake, TLS/HTTPS encryption, and payload delivery.",
        "Grasp Uniform Resource Identifiers (URIs), URLs, base paths, query parameters, and path variables.",
        "Understand the role of APIs in modern FinTech ecosystems connecting mobile frontends, microservices, payment gateways, and banking core systems."
      ],
      prerequisites: "Phase 1-3 analytical and data modeling foundations.",
      expectedOutcome: "The ability to conceptualize how digital applications communicate behind the scenes, tracing a payment request from mobile screen to banking core.",
      topics: [
        {
          concept: "Client-Server Architecture in Digital Products",
          what: "A distributed computing architecture where the client (mobile app or browser) requests resources or actions, and the server (backend application) processes business logic and interacts with the database.",
          why: "A Business Analyst must understand where errors originate: Is a checkout failure caused by client-side form validation, an API timeout, or database lock?",
          how: "Client sends HTTP Request -> Server processes business rules & queries database -> Server sends HTTP Response back to client.",
          example: "User clicks 'Invest ₹5,000' in the mobile app. The mobile client sends a POST request to `/api/v1/investments` with amount and fund_id.",
          businessCase: "Diagnosing customer support escalations: isolating whether an issue is an app bug or banking partner server downtime.",
          pitfalls: "Assuming the mobile app does the actual financial processing. (The app is merely a visual interface; all financial balances and transactions live on secure servers)."
        },
        {
          concept: "The Anatomy of a URL & Query Parameters",
          what: "A URL consists of: Protocol (`https://`), Host/Domain (`api.fintech.in`), Port (`:443`), Path (`/v1/transactions`), and Query String (`?status=success&limit=50`).",
          why: "BAs write technical API specifications and acceptance criteria that dictate exact endpoints and parameters for engineering teams.",
          how: "Path parameters identify a specific resource: `/users/{id}` (e.g. `/users/4502`). Query parameters filter, sort, or paginate collections: `?status=failed&sort=desc`.",
          example: "`https://api.fintech.in/v1/mandates/8921/transactions?status=SUCCESS&limit=10`.",
          businessCase: "Specifying requirements for an admin portal search screen that fetches filtered transactions by customer ID and date range.",
          pitfalls: "Using path parameters for optional filters (like `?page=2`) instead of query parameters."
        }
      ],
      resources: [
        { title: "How the Web Works: HTTP and Client-Server Overview", platform: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanisms/How_does_the_Internet_work", time: "25 mins", covers: "Official Mozilla guide to clients, servers, DNS, and HTTP packets." },
        { title: "APIs for Beginners 2024 (Full Course)", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+APIs+for+Beginners+Full+Course", time: "35 mins", covers: "What is an API, client-server models, requests, responses, and URLs." },
        { title: "Postman Learning Center: API Fundamentals", platform: "Postman Docs", url: "https://learning.postman.com/docs/getting-started/overview/", time: "20 mins", covers: "Official Postman guide to API architecture and request lifecycle." }
      ],
      timetable: [
        { time: "15 mins", activity: "Phase 4 Orientation: Bridge data analytics to technical API product requirements." },
        { time: "50 mins", activity: "Concept Study: Study Client-Server models, Request-Response lifecycle, and URL structures." },
        { time: "25 mins", activity: "Network Inspection: Inspect live network calls in Chrome DevTools Network Tab." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 API architecture challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Document End-to-End FinTech Payment Request Lifecycle." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 40 assessment questions." }
      ],
      exercises: [
        {
          title: "Deconstruct a Production FinTech API Endpoint",
          problem: "Deconstruct the URL `https://api.fintech.com:443/v2/investors/9821/sip-mandates?status=active&sort=desc` into its constituent parts.",
          scenario: "Writing API specification documentation for an engineering sprint.",
          instructions: "1. Identify: Protocol, Host, Port, Base Path, Resource Path, Path Parameter, Query String.\n2. State the purpose of each part.",
          expectedOutput: "Detailed architectural breakdown of the URL.",
          hint: "Protocol: https; Host: api.fintech.com; Path param: 9821; Query: status=active&sort=desc.",
          solution: "Protocol: HTTPS, Host: api.fintech.com, Port: 443, Resource: /v2/investors/{id}/sip-mandates, Path Param: 9821 (Investor ID), Query Params: status=active, sort=desc."
        },
        {
          title: "Inspect Live API Calls Using Chrome DevTools",
          problem: "Open any web application (e.g. your banking or shopping app), open Chrome DevTools (F12) > Network tab > Fetch/XHR, and inspect a live API call.",
          scenario: "Observing real-world HTTP request headers, payloads, and response JSON.",
          instructions: "1. Press F12 > Network tab > Filter: Fetch/XHR.\n2. Perform an action on the page.\n3. Click the captured request > Inspect Headers, Payload, and Response tabs.",
          expectedOutput: "Visual confirmation of client-to-server HTTP request and response cycle.",
          hint: "F12 > Network tab > Fetch/XHR.",
          solution: "Live API request inspected; confirmed request URL, method (GET/POST), status code (200 OK), and JSON payload."
        },
        {
          title: "Choose Path Parameter vs Query Parameter",
          problem: "Design the URL structure for two scenarios: 1) Fetching details of specific loan application #L-4581; 2) Searching all loans with status 'Underwriting' submitted in November 2024.",
          scenario: "API endpoint technical design for a digital lending feature.",
          instructions: "1. Scenario 1: Use a path parameter.\n2. Scenario 2: Use query parameters.\n3. Provide the complete URLs.",
          expectedOutput: "Two correctly formatted RESTful endpoint designs.",
          hint: "1) /api/loans/L-4581; 2) /api/loans?status=Underwriting&month=2024-11",
          solution: "1) GET /api/v1/loans/L-4581 (Path parameter identifies unique entity); 2) GET /api/v1/loans?status=Underwriting&month=2024-11 (Query parameters filter collection)."
        }
      ],
      assignment: {
        title: "End-to-End FinTech Payment Request Lifecycle Architecture Document",
        scenario: "Map out the complete architectural flow when an investor sets up a ₹2,000 monthly SIP on their mobile app.",
        deliverable: "Create a comprehensive architectural document detailing:\n1. Client Layer: Mobile app captures user input, validates amount locally, and formats request.\n2. Network Layer: HTTPS encrypted request transmitted to API Gateway.\n3. Backend Layer: Core service authenticates user token, checks KYC status, and inserts pending mandate into PostgreSQL database.\n4. External Integration: Backend communicates via REST API with Payment Gateway (Razorpay/Cashfree) to register NACH e-mandate.\n5. Response Layer: Synchronous response returned to mobile app displaying confirmation screen.",
        completionCriteria: "Structured architectural flowchart and step-by-step documentation bridging business requirements and technical communication."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary role of an API (Application Programming Interface) in digital products?", options: ["To design user interfaces.", "To serve as a standardized, secure communication contract allowing different software systems to exchange data and trigger actions.", "To store data permanently on hard drives.", "To replace web browsers."], correct: 1, explanation: "An API is a defined interface that enables independent systems (e.g. mobile app, backend, banking gateway) to communicate using standardized protocols." },
          { question: "In the URL `https://api.fintech.in/v1/users/102?tab=activity`, what is `102` and what is `tab=activity`?", options: ["102 is the domain; tab is the protocol.", "102 is a Path Parameter identifying a specific user; tab=activity is a Query Parameter filtering the view.", "Both are query parameters.", "102 is an error code."], correct: 1, explanation: "Path parameters (/users/102) locate a specific resource instance; query parameters (?tab=activity) provide optional parameters like filtering or sorting." },
          { question: "What encryption protocol secures HTTPS traffic between mobile clients and banking servers?", options: ["FTP", "TLS (Transport Layer Security) / SSL", "DNS", "SMTP"], correct: 1, explanation: "TLS (Transport Layer Security) encrypts data in transit, ensuring sensitive banking credentials and account numbers cannot be intercepted over the network." },
          { question: "Why should business logic (like investment eligibility rules) execute on the server rather than only in the mobile app client?", options: ["Mobile apps cannot perform math.", "Client-side code can be bypassed, hacked, or manipulated by malicious users; security and compliance rules must be strictly enforced on the secure server.", "Servers are cheaper.", "App stores do not allow logic."], correct: 1, explanation: "Client-side code is vulnerable to tampering. True business validation, security checks, and financial ledger writes must happen on the backend server." },
          { question: "What is the typical default port number for secure HTTPS web traffic?", options: ["80", "8080", "443", "21"], correct: 2, explanation: "Port 443 is the standard port for HTTPS encrypted traffic (Port 80 is unencrypted HTTP)." }
        ],
        scenarios: [
          { question: "A customer complains: 'The app says my payment went through, but my investment isn't showing up.' As a BA, how do you trace this across the client-server architecture?", solution: "1) Check client app logs to verify the HTTP POST request was sent and received a 200/201 response. 2) Inspect backend server logs to confirm the database record was written. 3) Inspect webhook logs from the payment gateway to see if the asynchronous payment confirmation arrived or failed at the banking nodal switch." },
          { question: "Why is it important for a Business Analyst to specify API timeout durations in a software requirements specification (SRS)?", solution: "If a banking partner's server freezes, a mobile app without an explicit timeout will spin endlessly with a loading spinner, frustrating users. Specifying a 15-second timeout with an automated fallback screen ('Payment taking longer than usual; we will update you via SMS') protects the user experience." },
          { question: "What is an API Gateway, and why do FinTech companies place it between mobile clients and internal microservices?", solution: "An API Gateway is a central reverse-proxy front door that handles cross-cutting concerns: rate limiting (preventing DDoS attacks), authentication (validating tokens), request routing to appropriate microservices, and response caching." }
        ],
        miniAssignment: "Write out the full URL for an API endpoint that retrieves failed transactions for user 505 sorted by amount descending."
      }
    },

    // DAY 41
    {
      day: 41, phase: "APIs & Postman", phaseId: 3,
      title: "REST Architecture & Resource-Oriented Design",
      difficulty: "Beginner-Intermediate", duration: 180,
      objectives: [
        "Master the 6 core architectural constraints of REST (Representational State Transfer).",
        "Understand Resource-Oriented Design: nouns vs verbs in endpoint design (e.g. `/investors` vs `/getInvestors`).",
        "Master resource hierarchies and nesting: `/users/{id}/bank-accounts/{acc_id}/mandates`.",
        "Grasp Statelessness: why the server must never rely on stored client session state between requests."
      ],
      prerequisites: "Day 40 client-server and HTTP fundamentals.",
      expectedOutcome: "The ability to review and design clean, intuitive RESTful API endpoint structures adhering to enterprise engineering standards.",
      topics: [
        {
          concept: "REST Principles & Noun-Based Endpoints",
          what: "REST (Representational State Transfer) is an architectural style for networked systems. In REST, endpoints represent resources (nouns), and HTTP verbs (GET, POST, PUT, DELETE) represent actions.",
          why: "Writing endpoints with embedded verbs (like `/createUser`, `/deleteUser`, `/getUserById`) violates REST standards, creates chaotic inconsistent APIs, and makes documentation nightmare.",
          how: "Use plural nouns: `/api/v1/investors` (collection), `/api/v1/investors/{id}` (individual resource). Use standard HTTP verbs to perform actions.",
          example: "GET `/mandates` (fetch all); POST `/mandates` (create new); GET `/mandates/501` (fetch one); DELETE `/mandates/501` (cancel).",
          businessCase: "Designing the public developer API for third-party fintech distributors integrating with your investment platform.",
          pitfalls: "Using action verbs inside URLs (e.g. `/api/v1/cancelMandate?id=501`) instead of RESTful DELETE on `/api/v1/mandates/501`."
        },
        {
          concept: "Statelessness & Idempotency",
          what: "Statelessness means every HTTP request from the client must contain all the information necessary for the server to understand and process it. The server stores no context about the client's past requests.",
          why: "Stateless servers can scale horizontally: request #1 can hit Server A, and request #2 can hit Server B without session synchronization issues.",
          how: "Every request includes the user's authentication token in the `Authorization: Bearer <token>` header.",
          example: "If a client loses internet connection, re-sending the exact same request with its auth token works without requiring a re-login.",
          businessCase: "High-volume SIP processing where thousands of simultaneous requests are load-balanced across multiple cloud server instances.",
          pitfalls: "Assuming the server 'remembers' previous client actions without passing IDs or tokens in the current request."
        }
      ],
      resources: [
        { title: "REST API Architectural Constraints & Best Practices", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design", time: "30 mins", covers: "Resource naming, URI design, statelessness, and nesting." },
        { title: "REST API Design Explained Simply in 10 Minutes", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+REST+API+Design+Best+Practices", time: "20 mins", covers: "Plural nouns, nesting, and avoiding verbs in URLs." },
        { title: "Postman Guide: Designing RESTful APIs", platform: "Postman Docs", url: "https://learning.postman.com/docs/designing-and-developing-your-api/the-api-workflow/", time: "25 mins", covers: "API design lifecycle, schemas, and resource definitions." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 40 client-server concepts and URL components." },
        { time: "50 mins", activity: "Concept Study: Study REST constraints, resource-oriented naming, and statelessness." },
        { time: "25 mins", activity: "Endpoint Refactoring: Audit and redesign anti-pattern API endpoints into RESTful standards." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 RESTful design challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Author FinTech Core REST API Specification Matrix." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 41 assessment questions." }
      ],
      exercises: [
        {
          title: "Refactor Non-RESTful URLs to RESTful Standards",
          problem: "Refactor these 4 anti-pattern endpoints: 1) `/api/getAllMutualFunds`, 2) `/api/createNewSIPMandate`, 3) `/api/deleteUserAccount?id=402`, 4) `/api/updateKYCStatusForUser`.",
          scenario: "Standardizing legacy API endpoints before mobile app redesign.",
          instructions: "1. Replace verbs with plural nouns.\n2. Assign appropriate HTTP verbs (GET, POST, DELETE, PATCH).\n3. Use path parameters for specific IDs.",
          expectedOutput: "Four clean, standardized RESTful endpoints.",
          hint: "GET /mutual-funds, POST /sip-mandates, DELETE /users/{id}, PATCH /users/{id}/kyc",
          solution: "1) GET /api/v1/mutual-funds, 2) POST /api/v1/sip-mandates, 3) DELETE /api/v1/users/402, 4) PATCH /api/v1/users/{id}/kyc."
        },
        {
          title: "Design Hierarchical Nested Resource Endpoints",
          problem: "Design RESTful endpoints to manage bank accounts belonging to a specific customer: List all bank accounts for user 105; Add a new bank account for user 105; Delete bank account 12 belonging to user 105.",
          scenario: "Sub-resource relationship design.",
          instructions: "1. List accounts: GET `/users/{user_id}/bank-accounts`.\n2. Add account: POST `/users/{user_id}/bank-accounts`.\n3. Delete account: DELETE `/users/{user_id}/bank-accounts/{account_id}`.",
          expectedOutput: "Three nested RESTful endpoints.",
          hint: "Use nested paths to express parent-child relationships.",
          solution: "GET /api/v1/users/105/bank-accounts; POST /api/v1/users/105/bank-accounts; DELETE /api/v1/users/105/bank-accounts/12."
        },
        {
          title: "Evaluate Statelessness in Banking Login",
          problem: "Explain why sending a JWT Bearer Token in every request satisfies REST statelessness, whereas storing shopping cart items in server session RAM violates it.",
          scenario: "Architectural review with the engineering lead.",
          instructions: "1. Define how statelessness enables horizontal scaling.\n2. Explain the role of self-contained tokens.",
          expectedOutput: "Clear architectural justification of stateless API design.",
          hint: "Stateless requests contain all credentials needed to authenticate independently.",
          solution: "With JWT tokens, any server instance can validate the cryptographic signature independently without reading local session RAM, enabling seamless horizontal auto-scaling."
        }
      ],
      assignment: {
        title: "FinTech Investment Platform REST API Technical Specification",
        scenario: "Author the core REST API contract for the mobile engineering and backend engineering teams.",
        deliverable: "Create a formal API Specification table documenting 6 core endpoints:\n1. `GET /api/v1/mutual-funds`: Fetch filtered catalog (query params: category, risk_level, sort, page).\n2. `GET /api/v1/mutual-funds/{id}`: Fetch single scheme prospectus.\n3. `POST /api/v1/sip-mandates`: Create recurring investment mandate.\n4. `GET /api/v1/users/{id}/portfolio`: Fetch user asset allocation and total current value.\n5. `POST /api/v1/transactions`: Execute lump-sum investment.\n6. `DELETE /api/v1/sip-mandates/{id}`: Cancel an active recurring mandate.\nFor each endpoint, document: Method, URI, Description, Path Params, Query Params, and Expected Status Code.",
        completionCriteria: "Complete, professional REST API specification matrix adhering strictly to noun-based REST standards."
      },
      assessment: {
        mcqs: [
          { question: "Which of the following URIs violates RESTful design standards?", options: ["GET /api/v1/customers/102", "POST /api/v1/orders", "GET /api/v1/getAllActiveCustomers", "DELETE /api/v1/mandates/50"], correct: 2, explanation: "`/api/v1/getAllActiveCustomers` violates REST by embedding the action verb 'getAll' in the URL. In REST, the URL should be `GET /api/v1/customers?status=active`." },
          { question: "What does 'Statelessness' mean in REST architecture?", options: ["The server does not save data to a database.", "Every client request must contain all the information necessary to understand and process the request; the server stores no client session context between requests.", "The client can only make one request per day.", "The API is offline."], correct: 1, explanation: "Statelessness dictates that every request is self-contained. The server does not store client session context, facilitating horizontal scalability." },
          { question: "How should parent-child relationships be represented in RESTful URIs (e.g. a transaction belonging to an order)?", options: ["`/transactions?order=10` only", "`/orders/{order_id}/transactions/{transaction_id}`", "`/orders_and_transactions_10_20`", "`/get_order_transaction`"], correct: 1, explanation: "Hierarchical nesting (`/parents/{id}/children/{id}`) cleanly expresses sub-resource ownership in REST." },
          { question: "Should resource names in REST URIs typically be singular or plural?", options: ["Singular (e.g. `/customer`)", "Plural (e.g. `/customers`)", "Either is fine randomly", "Capitalized singular (e.g. `/Customer`)"], correct: 1, explanation: "Industry standard REST convention mandates lowercase plural nouns (`/customers`, `/orders`, `/transactions`) to represent collections." },
          { question: "What HTTP method should be used to retrieve an existing resource without modifying anything?", options: ["POST", "FETCH", "GET", "PUT"], correct: 2, explanation: "GET is the safe, idempotent HTTP method used strictly for retrieving data representations." }
        ],
        scenarios: [
          { question: "A developer proposes an endpoint: `POST /api/v1/users/delete/45`. How do you politely correct this in a sprint grooming meeting as a BA?", solution: "I explain that in RESTful architecture, the URL identifies the resource (`/api/v1/users/45`) and the HTTP verb specifies the action. Embedding 'delete' in a POST URL creates duplicate endpoints and violates standards. We should use `DELETE /api/v1/users/45` instead." },
          { question: "What is Idempotency in HTTP methods, and which core methods are idempotent?", solution: "An HTTP method is idempotent if executing it multiple times produces the exact same result on the server as executing it once. GET, PUT, and DELETE are idempotent. POST is NOT idempotent (calling POST /transactions 5 times creates 5 separate transactions, causing multiple debits)." },
          { question: "How does an API handle versioning in RESTful design (e.g. `/api/v1/` vs `/api/v2/`)?", solution: "URI path versioning (`/api/v1/resource`) is the most common industry standard. It ensures that when new breaking changes are deployed in v2, existing legacy mobile apps running v1 continue to function without crashing until users update their app." }
        ],
        miniAssignment: "Draft the REST endpoint and HTTP verb for creating a new bank account under user ID 200."
      }
    },

    // DAY 42 (Weekly Assessment 6)
    {
      day: 42, phase: "APIs & Postman", phaseId: 3,
      title: "HTTP Verbs & Status Code Taxonomies [Weekly Assessment 6]",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master the 5 core HTTP methods: GET (Read), POST (Create), PUT (Full Replace), PATCH (Partial Update), DELETE (Remove).",
        "Understand HTTP Status Code Taxonomies: 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error.",
        "Master critical status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Error, 503 Service Unavailable.",
        "Synthesize Weeks 1–6 competencies in the comprehensive Weekly Assessment 6."
      ],
      prerequisites: "Days 40-41 client-server and REST architecture.",
      expectedOutcome: "The ability to accurately interpret server response codes, write precise error-handling acceptance criteria, and map CRUD operations to HTTP methods.",
      topics: [
        {
          concept: "HTTP Verbs & CRUD Operations (PUT vs PATCH)",
          what: "CRUD maps directly to HTTP: Create = POST, Read = GET, Update = PUT/PATCH, Delete = DELETE. PUT replaces the entire resource; PATCH updates only specific fields.",
          why: "If an investor updates only their phone number, sending a PUT request with only the phone number might wipe out their name and address if the backend overwrites the whole record. PATCH modifies only the changed field.",
          how: "PATCH `/users/102` with body `{\"phone\": \"9876543210\"}` modifies strictly the phone number.",
          example: "POST `/transactions` creates a new transaction (Status 201 Created). DELETE `/mandates/5` cancels mandate (Status 204 No Content).",
          businessCase: "Writing user story acceptance criteria: 'When user edits communication email, client shall send PATCH request to `/api/v1/profile`.'",
          pitfalls: "Using PUT when you intended a partial update, risking accidental data erasure of unspecified fields."
        },
        {
          concept: "HTTP Status Code Families & Error Diagnostics",
          what: "Standardized 3-digit status codes communicating the outcome of a request: 2xx (Success), 4xx (Client made a mistake), 5xx (Server crashed or third-party down).",
          why: "Differentiating 401 (Not logged in / expired token) from 403 (Logged in, but lacks permission) and 422 (Valid JSON, but failed business validation like insufficient balance).",
          how: "200 = Success with payload; 201 = Resource created; 400 = Malformed syntax; 401 = Missing auth token; 403 = Role forbidden; 404 = Not found; 422 = Business rule failed; 500 = Code bug; 503 = Server overloaded / bank gateway down.",
          example: "A customer with ₹2,000 balance attempts to invest ₹5,000. Server returns `422 Unprocessable Entity` with error 'INSUFFICIENT_FUNDS'.",
          businessCase: "Designing frontend user error banners based on specific backend HTTP status codes.",
          pitfalls: "Returning `200 OK` with a body containing `{\"error\": \"Failed\"}` (an anti-pattern that breaks automated monitoring and HTTP caching)."
        }
      ],
      resources: [
        { title: "HTTP Status Codes Comprehensive Visual Guide", platform: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", time: "25 mins", covers: "Official Mozilla reference on all standard 1xx-5xx status codes." },
        { title: "HTTP Methods & Status Codes Explained Visually", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+HTTP+Methods+Status+Codes+GET+POST+PUT+PATCH", time: "30 mins", covers: "GET, POST, PUT vs PATCH, DELETE, and error code breakdowns." },
        { title: "Postman Learning Center: Working with HTTP Status Codes", platform: "Postman Docs", url: "https://learning.postman.com/docs/sending-requests/responses/", time: "20 mins", covers: "Inspecting response codes, timing, and headers in Postman." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 41 REST principles and endpoint naming." },
        { time: "50 mins", activity: "Concept Study: Study HTTP verbs, PUT vs PATCH, and status code taxonomies (2xx, 4xx, 5xx)." },
        { time: "25 mins", activity: "Scenario Mapping: Map business scenarios (login expired, bad PAN, bank timeout) to exact status codes." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 HTTP method and status code challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Complete Weekly Assessment 6 API Error Matrix." },
        { time: "20 mins", activity: "Quiz & Review: Complete Weekly Assessment 6 assessment questions." }
      ],
      exercises: [
        {
          title: "Map FinTech Business Scenarios to Exact HTTP Status Codes",
          problem: "Assign the correct HTTP status code for 5 scenarios: 1) Investment successfully placed and created; 2) User token expired 30 minutes ago; 3) Investor attempts to access admin audit logs; 4) User enters 9 digits instead of 10 for PAN card; 5) Banking partner nodal server times out.",
          scenario: "Specifying error-handling behavior in user stories.",
          instructions: "1. Scenario 1 = 201 Created.\n2. Scenario 2 = 401 Unauthorized.\n3. Scenario 3 = 403 Forbidden.\n4. Scenario 4 = 422 Unprocessable Entity (or 400 Bad Request).\n5. Scenario 5 = 504 Gateway Timeout (or 503 Service Unavailable).",
          expectedOutput: "Five correctly mapped status codes with justifications.",
          hint: "201, 401, 403, 422, 504",
          solution: "1) 201 Created, 2) 401 Unauthorized, 3) 403 Forbidden, 4) 422 Unprocessable Entity (business validation failed), 5) 504 Gateway Timeout (upstream partner timeout)."
        },
        {
          title: "Differentiate PUT vs PATCH in Customer Profile Update",
          problem: "A user updates their mailing address in the app. Compare the request body and server behavior if the backend implemented PUT vs PATCH.",
          scenario: "Preventing accidental data loss in profile updates.",
          instructions: "1. PUT payload must include ALL user profile fields; missing fields are overwritten as NULL.\n2. PATCH payload includes ONLY `{\"address\": \"New Street, Mumbai\"}`.\n3. State which is safer for partial profile editing.",
          expectedOutput: "Clear technical comparison showing why PATCH is preferred for partial updates.",
          hint: "PATCH is for partial modifications; PUT is for complete replacements.",
          solution: "PATCH is safer because it modifies only the supplied fields (`address`). A PUT request would replace the entire profile resource, wiping out phone, email, and preferences if omitted."
        },
        {
          title: "Audit the '200 OK with Error Body' Anti-Pattern",
          problem: "A banking partner API returns `HTTP 200 OK` with body `{\"status\": \"FAILURE\", \"errorCode\": \"BANK_DOWN\"}`. Explain why this violates HTTP standards and how to fix it.",
          scenario: "Third-party vendor API technical evaluation.",
          instructions: "1. Explain how this breaks API gateways and monitoring.\n2. Recommend the correct HTTP status code.\n3. Write the corrected HTTP response header.",
          expectedOutput: "Technical critique of false-200 anti-pattern.",
          hint: "HTTP status codes exist specifically to communicate success/failure at the transport layer.",
          solution: "Returning 200 OK for a failure prevents HTTP caching layers, retry engines, and monitoring tools from detecting outages. The server should return `HTTP 503 Service Unavailable` or `HTTP 502 Bad Gateway`."
        }
      ],
      assignment: {
        title: "Weekly Assessment 6: FinTech API Error Taxonomy & Acceptance Criteria Matrix",
        scenario: "Create the formal API error-handling specification for the mobile app checkout flow.",
        deliverable: "Deliver a comprehensive markdown specification table with 6 columns: Scenario, Endpoint, HTTP Method, HTTP Status Code, Sample JSON Error Payload, Frontend UI Action.\nCover 6 mandatory scenarios:\n1. Successful Mandate Creation (201 Created -> Show green checkmark).\n2. Expired Session Token (401 Unauthorized -> Redirect to Login screen).\n3. Non-KYC User attempting high-value transaction (403 Forbidden -> Open KYC submission modal).\n4. Insufficient Bank Balance (422 Unprocessable Entity -> Show 'Add funds to bank account' banner).\n5. Invalid IFSC Code format (400 Bad Request -> Highlight IFSC field in red).\n6. Razorpay Server Timeout (504 Gateway Timeout -> Show 'Bank taking longer than usual; retry in 5 mins').",
        completionCriteria: "Complete, production-ready specification matrix bridging backend HTTP status codes and frontend user experience."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary difference between a 401 Unauthorized status and a 403 Forbidden status?", options: ["They are identical.", "401 means the user is not authenticated (missing or expired login token); 403 means the user is authenticated, but lacks permission to access the resource.", "401 is for mobile; 403 is for web.", "401 is a server error; 403 is a client error."], correct: 1, explanation: "401 Unauthorized indicates authentication failure (login required). 403 Forbidden indicates authorization failure (identity is verified, but access rights are denied)." },
          { question: "Which HTTP status code should a RESTful server return upon successfully creating a new resource via a POST request?", options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"], correct: 1, explanation: "201 Created is the specific, standard HTTP status code indicating that a new resource has been successfully created." },
          { question: "What does a 204 No Content status code indicate?", options: ["The server could not find the file.", "The request succeeded, but the server intentionally returns no response body (commonly used for successful DELETE requests).", "An empty database table.", "A network disconnection."], correct: 1, explanation: "204 No Content signifies that the action succeeded and there is no message body to return (standard for DELETE actions)." },
          { question: "Which HTTP status code is most appropriate when a JSON request is well-formed, but fails a business logic validation rule (e.g. withdrawal amount exceeds account balance)?", options: ["404 Not Found", "422 Unprocessable Entity", "500 Internal Server Error", "301 Moved Permanently"], correct: 1, explanation: "422 Unprocessable Entity indicates that the syntax is valid, but the server cannot process the contained instructions due to business logic or semantic errors." },
          { question: "What category of status codes represents server-side crashes, bugs, or upstream partner timeouts?", options: ["1xx", "2xx", "4xx", "5xx"], correct: 3, explanation: "5xx status codes indicate server-side failures (e.g. 500 Internal Error, 502 Bad Gateway, 503 Unavailable, 504 Timeout)." }
        ],
        scenarios: [
          { question: "Why is returning `HTTP 500 Internal Server Error` bad for customer-facing applications, and what should be done instead?", solution: "A 500 error typically indicates an unhandled software crash or exception (like a NullPointerException) and exposes security vulnerabilities or scares users. Handled business errors should be caught gracefully and returned with appropriate 4xx codes (like 422 or 400) and user-friendly error messages." },
          { question: "How does an API client know whether it is safe to automatically retry a failed request?", solution: "If the server returns a 503 Service Unavailable or 504 Gateway Timeout, the client can retry with exponential backoff. If it returns 400, 401, 403, 404, or 422, the request is permanently invalid and retrying the exact same request will produce the exact same failure without user correction." },
          { question: "What is the difference between a 301 Redirect and a 302 Redirect, and how does it affect API clients?", solution: "301 Moved Permanently tells clients and search engines that the URL has permanently changed, so clients should update their stored URL. 302 Found (Temporary Redirect) tells clients to temporarily use the new URL for this request while keeping the original URL for future requests." }
        ],
        miniAssignment: "Write a sample JSON error response body for a 422 Unprocessable Entity when an investment amount is below the minimum ₹500 threshold."
      }
    },

    // DAY 43
    {
      day: 43, phase: "APIs & Postman", phaseId: 3,
      title: "JSON Schema, Headers & Payload Formatting",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master the JSON (JavaScript Object Notation) data exchange format: Objects `{}` vs Arrays `[]`.",
        "Understand JSON primitive data types: Strings, Numbers, Booleans, null.",
        "Master HTTP Request & Response Headers: `Content-Type`, `Accept`, `Authorization`, `User-Agent`.",
        "Inspect and construct real-world FinTech transaction payloads, webhook notifications, and KYC documents."
      ],
      prerequisites: "Days 40-42 REST architecture and HTTP methods.",
      expectedOutcome: "The ability to read, write, validate, and debug complex nested JSON payloads and configure appropriate HTTP headers.",
      topics: [
        {
          concept: "JSON Structure & Nesting (Objects vs Arrays)",
          what: "JSON is a lightweight text-based data format representing key-value pairs (`{\"key\": \"value\"}`) and ordered lists (`[\"a\", \"b\"]`).",
          why: "99% of modern REST APIs communicate using JSON. A BA must be completely fluent in reading and authoring JSON request payloads.",
          how: "Keys must be enclosed in double quotes. Values can be strings, numbers, booleans (true/false), null, nested objects, or arrays.",
          example: "A transaction payload with nested customer and payment objects: `{\"txn_id\": 9821, \"amount\": 2500.00, \"customer\": {\"id\": 101, \"name\": \"Pooja\"}, \"items\": [\"SIP_Nov\", \"Fee\"]}`.",
          businessCase: "Documenting the exact JSON payload expected by the `/api/v1/sip-mandates` endpoint in the feature requirement specification.",
          pitfalls: "Using single quotes (`{'key': 'value'}`), trailing commas after the last item (`{\"a\": 1,}`), or unquoted keys, all of which cause fatal JSON parse errors."
        },
        {
          concept: "HTTP Headers: Content-Type & Content Negotiation",
          what: "Headers are metadata key-value pairs passed at the beginning of an HTTP request or response. `Content-Type: application/json` declares that the payload body is JSON.",
          why: "If a client sends JSON without the `Content-Type: application/json` header, many backend frameworks fail to parse the body and return `415 Unsupported Media Type` or `400 Bad Request`.",
          how: "In Postman or curl: set Header `Content-Type` = `application/json`, and `Accept` = `application/json`.",
          example: "`Authorization: Bearer eyJhbGciOi...` communicates the user's authentication credentials.",
          businessCase: "Setting up webhook callbacks where payment gateways send signed event payloads with `X-Razorpay-Signature` verification headers.",
          pitfalls: "Omitting the Content-Type header when making POST or PUT requests containing JSON bodies."
        }
      ],
      resources: [
        { title: "JSON Syntax and Structure Guide", platform: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON", time: "25 mins", covers: "Official guide to JSON syntax, data types, parsing, and serialization." },
        { title: "HTTP Headers Explained Simply", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+HTTP+Headers+Content+Type+Authorization", time: "25 mins", covers: "Content-Type, Accept, Authorization, and custom headers." },
        { title: "JSON Formatter and Validator Tool", platform: "JSONLint", url: "https://jsonlint.com/", time: "15 mins", covers: "Validating syntax, debugging missing quotes, and formatting nested JSON." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 42 HTTP methods and status code families." },
        { time: "50 mins", activity: "Concept Study: Study JSON data types, nesting, HTTP headers, and Content-Type." },
        { time: "25 mins", activity: "Hands-on Validation: Author and validate complex nested JSON in JSONLint." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 JSON payload formatting challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Construct Master FinTech Transaction & Webhook Payload Suite." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 43 assessment questions." }
      ],
      exercises: [
        {
          title: "Construct a Valid Nested SIP Mandate JSON Payload",
          problem: "Author a valid JSON payload to create a new SIP mandate with: Investor ID, Mutual Fund ID, Monthly Amount (₹3,000), Frequency ('MONTHLY'), Bank Details object (IFSC, Account Number), and an Array of 2 Notification Preferences ('SMS', 'EMAIL').",
          scenario: "Specifying backend request schema.",
          instructions: "1. Keys in double quotes.\n2. Numbers unquoted.\n3. Bank details as nested object `{}`.\n4. Preferences as string array `[]`.",
          expectedOutput: "100% valid JSON payload passing validator tests.",
          hint: "{\"investor_id\": 101, \"amount\": 3000, \"bank\": {...}, \"notifications\": [...] }",
          solution: "{\n  \"investor_id\": 1052,\n  \"fund_id\": 42,\n  \"monthly_amount\": 3000.00,\n  \"frequency\": \"MONTHLY\",\n  \"bank_details\": {\n    \"account_number\": \"004128938120\",\n    \"ifsc_code\": \"HDFC0001254\"\n  },\n  \"notification_channels\": [\"SMS\", \"EMAIL\"]\n}"
        },
        {
          title: "Debug 3 Fatal Syntax Errors in a Broken JSON String",
          problem: "Identify and fix the 3 syntax errors in: `{'status': 'SUCCESS', 'amount': 4500, 'items': ['Nifty50', 'Gold',],}`.",
          scenario: "Troubleshooting a failing API integration test.",
          instructions: "1. Error 1: Single quotes instead of double quotes.\n2. Error 2: Trailing comma in array `['Gold',]`.\n3. Error 3: Trailing comma at end of object `{... ,}`.",
          expectedOutput: "Cleaned valid JSON string.",
          hint: "JSON strictly forbids single quotes and trailing commas.",
          solution: "{\n  \"status\": \"SUCCESS\",\n  \"amount\": 4500,\n  \"items\": [\n    \"Nifty50\",\n    \"Gold\"\n  ]\n}"
        },
        {
          title: "Simulate an Inbound Payment Gateway Webhook Payload",
          problem: "Author the incoming JSON payload sent by Razorpay when an automated monthly SIP debit succeeds.",
          scenario: "Documenting webhook ingestion requirements for backend engineers.",
          instructions: "1. Root keys: `event` ('payment.captured'), `created_at` (epoch timestamp), `payload` (nested object).\n2. Inside payload: payment entity with id, amount in paise (300000), method, and status.",
          expectedOutput: "Standardized payment gateway webhook JSON structure.",
          hint: "Razorpay amounts are typically passed as integers in paise (₹1 = 100 paise).",
          solution: "{\n  \"event\": \"payment.captured\",\n  \"created_at\": 1731938400,\n  \"payload\": {\n    \"payment\": {\n      \"entity\": {\n        \"id\": \"pay_N83xL294jK\",\n        \"amount\": 300000,\n        \"currency\": \"INR\",\n        \"status\": \"captured\",\n        \"method\": \"upi\"\n      }\n    }\n  }\n}"
        }
      ],
      assignment: {
        title: "Master FinTech API Payload & Webhook Technical Document",
        scenario: "Complete the comprehensive payload schema specification for the payment engineering sprint.",
        deliverable: "Deliver documented, validated JSON schemas for:\n1. Customer Registration Request: Name, Email, Phone, PAN, Date of Birth.\n2. Successful Response Payload (201 Created): Generated user_id, registration timestamp, KYC status ('PENDING'), and access token.\n3. SIP Creation Error Payload (422 Unprocessable): Error code ('INVALID_MANDATE_AMOUNT'), human-readable message, and field validation errors.\n4. Inbound Gateway Failure Webhook: Error description ('INSUFFICIENT_FUNDS') and retry schedule metadata.\n5. Required HTTP Headers list: `Content-Type`, `Accept`, `Authorization`, and `X-Request-Id`.",
        completionCriteria: "All 4 JSON payloads verified in JSONLint with zero syntax errors, accompanied by full header definitions."
      },
      assessment: {
        mcqs: [
          { question: "Which of the following is NOT a valid primitive data type in JSON?", options: ["String", "Number", "Date", "Boolean"], correct: 2, explanation: "JSON does not have a native Date data type. Dates are formatted as ISO 8601 strings (e.g. \"2024-11-18T14:30:00Z\") or integer Unix epoch timestamps." },
          { question: "Why does `{ 'status': 'ACTIVE' }` fail JSON validation?", options: ["The word ACTIVE must be lowercase.", "JSON syntax strictly mandates double quotes (\") for both keys and strings; single quotes are illegal.", "Curly braces are not permitted.", "Numbers are missing."], correct: 1, explanation: "JSON specifications strictly require double quotes for all keys and string values. Single quotes result in an immediate parsing error." },
          { question: "What is the purpose of the HTTP header `Content-Type: application/json`?", options: ["It encrypts the message.", "It informs the receiving server that the data contained in the request body is formatted as JSON.", "It downloads a file.", "It specifies the user's password."], correct: 1, explanation: "The Content-Type header informs the recipient how to interpret and parse the incoming body payload." },
          { question: "What causes an 'Unexpected trailing comma' error in JSON parsers?", options: ["Having a comma after the final key-value pair or array element (e.g. `[1, 2, 3,]`).", "Using commas inside text strings.", "Missing commas between items.", "Using numbers with decimals."], correct: 0, explanation: "Unlike modern JavaScript, standard JSON strictly prohibits trailing commas after the last item in objects or arrays." },
          { question: "What does the `Accept: application/json` header communicate from the client to the server?", options: ["The client accepts all terms of service.", "The client informs the server that it expects and can only understand responses formatted in JSON.", "It accepts cookies.", "It logs the user in."], correct: 1, explanation: "The Accept header is used in HTTP content negotiation, telling the server what MIME type the client desires in the response." }
        ],
        scenarios: [
          { question: "Why do financial payment gateways (like Razorpay and Stripe) pass currency amounts in integer subunits (e.g. 50000 paise instead of ₹500.00) in JSON payloads?", solution: "Passing floating-point decimals in JSON (e.g. 500.00 or 12.456) exposes transactions to binary floating-point rounding errors across different programming languages. Storing amounts as whole integer cents or paise eliminates fractional penny ambiguity completely." },
          { question: "How does a backend server verify that an inbound webhook payload was genuinely sent by Razorpay and not faked by a hacker?", solution: "The gateway calculates a cryptographic HMAC SHA-256 signature using the raw payload body and a shared secret key, sending it in an HTTP header (e.g. `X-Razorpay-Signature`). The backend re-computes the signature locally; if the signatures match exactly, the webhook is verified as authentic and untampered." },
          { question: "What is JSON Schema, and how do automated testing tools use it to validate API responses?", solution: "JSON Schema is a formal specification describing the expected structure, data types, required keys, and value constraints of a JSON payload. Automated tests use JSON Schema validation to verify that an API returns all expected fields with correct data types in a single assertion." }
        ],
        miniAssignment: "Write a valid JSON object containing user_id (number), is_verified (boolean), and roles (array of strings)."
      }
    },

    // DAY 44
    {
      day: 44, phase: "APIs & Postman", phaseId: 3,
      title: "Postman Interface, Environment Variables & API Request Execution",
      difficulty: "Intermediate", duration: 180,
      objectives: [
        "Master the Postman Desktop interface: Workspaces, Collections, Folders, and Request Builder.",
        "Configure Request elements: HTTP Method, URL, Params (query parameters), Headers, and Body (raw JSON).",
        "Implement Environment Variables: dynamic `{{base_url}}`, `{{token}}`, and `{{user_id}}` to eliminate hardcoded values.",
        "Execute and inspect live HTTP requests: Status Code, Response Time (latency in ms), Response Size, and Response Body."
      ],
      prerequisites: "Days 40-43 HTTP and JSON foundations.",
      expectedOutcome: "A configured Postman workspace containing an organized FinTech Collection with dynamic environment variables, executing live GET and POST requests.",
      topics: [
        {
          concept: "Postman Workspaces, Collections & Request Builder",
          what: "Postman is the global industry-standard platform for API development and testing. Collections organize related API endpoints into structured, executable folders.",
          why: "Instead of testing APIs with ad-hoc command-line scripts, Postman provides a visual, collaborative repository where BAs can test endpoints, verify payloads, and share test suites with developers.",
          how: "Create Collection 'FinTech Investment API' > Add Folders: '01 Auth', '02 Users', '03 Mandates', '04 Transactions' > Add Requests.",
          example: "Saving a `Create SIP Mandate` POST request with pre-configured headers and sample JSON body for repeated testing.",
          businessCase: "Verifying backend sprint deliverables independently before QA begins manual mobile app testing.",
          pitfalls: "Saving requests with hardcoded static IDs and passwords instead of using dynamic Postman variables."
        },
        {
          concept: "Environment Variables & Dynamic Scoping",
          what: "Variables allow you to store and reuse values across requests. Environments (e.g. 'Development', 'Staging', 'Production') let you switch server targets with one click.",
          why: "If the staging server URL changes from `staging.api.com` to `staging2.api.com`, you update `{{base_url}}` once in the Environment rather than editing 50 individual requests.",
          how: "Create Environment 'FinTech Staging' > Add variable `base_url` = `https://api-staging.fintech.in`. Use `{{base_url}}/v1/users` in request URL.",
          example: "Capturing an authentication token from a login response and auto-saving it into `{{auth_token}}` for all subsequent requests.",
          businessCase: "Seamlessly switching test suites between local developer sandbox and staging servers.",
          pitfalls: "Putting production API keys into global variables where they can be accidentally exposed."
        }
      ],
      resources: [
        { title: "Postman Beginner Tutorial 2024 (Step-by-Step)", platform: "Postman Learning Center", url: "https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/", time: "25 mins", covers: "Official Postman guide to sending your first request, inspecting responses." },
        { title: "How to Use Postman: Full Beginner Crash Course", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+Postman+API+Tutorial+for+Beginners", time: "35 mins", covers: "Collections, environments, variables, and request building." },
        { title: "Using Variables in Postman Official Guide", platform: "Postman Docs", url: "https://learning.postman.com/docs/sending-requests/variables/", time: "20 mins", covers: "Environment vs collection vs global variables." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 43 JSON schemas and HTTP headers." },
        { time: "50 mins", activity: "Concept Study: Study Postman interface, Collections, Request Builder, and Environment Variables." },
        { time: "25 mins", activity: "Hands-on Setup: Download/launch Postman, create workspace, and configure 'FinTech Staging' environment." },
        { time: "30 mins", activity: "Request Execution: Build and execute live GET and POST requests against public sandbox APIs." },
        { time: "40 mins", activity: "Practical Business Assignment: Construct Master FinTech Postman Collection." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 44 assessment questions." }
      ],
      exercises: [
        {
          title: "Build and Execute a GET Request in Postman",
          problem: "In Postman, send a GET request to a public sandbox endpoint (or `https://reqres.in/api/users?page=2`). Inspect status code, response time, and JSON body.",
          scenario: "Validating that customer list retrieval functions within acceptable latency (<500ms).",
          instructions: "1. Set Method = GET.\n2. URL = `https://reqres.in/api/users`.\n3. In Params tab, add `page` = `2`.\n4. Click Send. Verify Status: 200 OK, Time < 500ms.",
          expectedOutput: "Successful 200 OK response with populated JSON array of users.",
          hint: "Click Send > Review bottom pane.",
          solution: "Request executed successfully; verified status 200 OK, response time, and body."
        },
        {
          title: "Configure Dynamic Environment Variables in Postman",
          problem: "Create an Environment named `FinTech_Staging`. Add variable `base_url` set to `https://reqres.in`. Re-write request URL to `{{base_url}}/api/users`.",
          scenario: "Eliminating hardcoded URLs across test suites.",
          instructions: "1. Click Environments icon on left > Create Environment.\n2. Add `base_url` = `https://reqres.in`.\n3. Select environment from top-right dropdown.\n4. In request bar, type `{{base_url}}/api/users` > Send.",
          expectedOutput: "Request resolves variable and succeeds identically.",
          hint: "Select the environment in the top right dropdown.",
          solution: "Environment variable configured and resolved dynamically in request bar."
        },
        {
          title: "Execute a POST Request with JSON Body",
          problem: "Send a POST request to `{{base_url}}/api/users` with raw JSON body creating a new customer: `{\"name\": \"Kavitha\", \"job\": \"Investor\"}`.",
          scenario: "Testing customer creation API endpoint.",
          instructions: "1. Method = POST.\n2. URL = `{{base_url}}/api/users`.\n3. Body tab > Select 'raw' > Choose 'JSON' in dropdown.\n4. Paste payload > Send. Verify Status: 201 Created.",
          expectedOutput: "Status 201 Created with returned ID and timestamp in response.",
          hint: "Body > raw > JSON dropdown on right.",
          solution: "POST request executed successfully, receiving 201 Created with generated ID."
        }
      ],
      assignment: {
        title: "FinTech Core Services Postman Collection Construction",
        scenario: "Build a structured Postman collection representing the core API capabilities of the investment platform.",
        deliverable: "1. Create Postman Collection: `FinTech_Investment_Platform`.\n2. Create 3 Folders: `01_Users`, `02_Catalog`, `03_Investments`.\n3. Request 1: `GET {{base_url}}/api/users?page=1` (List Users).\n4. Request 2: `POST {{base_url}}/api/users` with JSON payload (Register Customer).\n5. Request 3: `GET {{base_url}}/api/users/2` (Get Single Customer Details).\n6. Request 4: `POST {{base_url}}/api/investments` with sample SIP payload.\n7. Save all requests inside the collection.",
        completionCriteria: "Organized Postman collection with dynamic environment variable resolution and saved sample payloads."
      },
      assessment: {
        mcqs: [
          { question: "How are environment variables referenced inside the URL or headers in Postman?", options: ["`$variable`", "`{{variable}}`", "`%variable%`", "`#variable`"], correct: 1, explanation: "Postman uses double curly braces `{{variable_name}}` to reference environment, collection, or global variables." },
          { question: "What happens if you select 'raw' in the Body tab of Postman, but leave the type set to 'Text' instead of 'JSON'?", options: ["The request fails to send.", "Postman sets the `Content-Type` header to `text/plain` instead of `application/json`, which may cause the server to reject the payload with an error.", "It converts the text to an image.", "Nothing, servers ignore headers."], correct: 1, explanation: "Selecting 'JSON' from the raw dropdown automatically configures the critical `Content-Type: application/json` header." },
          { question: "What are the three core operational metrics displayed in the Postman response bar after sending a request?", options: ["Status Code, Response Time (ms), Response Size (KB)", "CPU usage, Memory usage, Battery level", "Password, Token, Cookie", "Screen resolution, OS, Browser"], correct: 0, explanation: "Postman displays the HTTP Status Code, execution latency/response time in milliseconds, and the payload download size in kilobytes." },
          { question: "Why should you organize requests into Collections rather than leaving them in your personal Postman History?", options: ["History is cleared automatically.", "Collections allow grouping by feature, sharing with team members, applying common authentication, running automated tests, and generating documentation.", "History only saves 5 requests.", "Collections encrypt your hard drive."], correct: 1, explanation: "Collections are permanent, structured, shareable test suites that support automated testing, environments, and team collaboration." },
          { question: "What is the difference between an Environment Variable and a Collection Variable in Postman?", options: ["Environment variables can change based on the active server environment (Dev vs Prod); Collection variables are locked specifically to that single collection regardless of environment.", "Collection variables are faster.", "Environment variables are only for numbers.", "There is no difference."], correct: 0, explanation: "Environment variables adapt dynamically when switching environments (Dev, Staging, Prod), while Collection variables are bundled strictly within a specific collection." }
        ],
        scenarios: [
          { question: "In Postman, a POST request returns `400 Bad Request` with message 'Unexpected token in JSON at position 18'. How do you troubleshoot this?", solution: "Position 18 indicates a syntax error near character 18 of the request body. Check for unquoted keys, single quotes instead of double quotes, missing colons, or an accidental trailing comma. Use a JSON validator to identify the syntax break." },
          { question: "How does a Business Analyst use Postman during Agile sprint demo acceptance testing?", solution: "Instead of waiting for the mobile UI to be finished, the BA imports the developer's Postman collection, switches to the Staging environment, triggers requests with boundary test cases (valid and invalid inputs), and validates that business rules and error codes meet the User Story acceptance criteria." },
          { question: "Why is it dangerous to check sensitive API keys or passwords directly into public Postman workspaces or Git repositories?", solution: "Automated bots continuously scrape public repositories and workspaces for exposed API keys. If a live payment gateway secret key is leaked, attackers can trigger unauthorized refunds, drain accounts, or access confidential customer financial data." }
        ],
        miniAssignment: "Create a new Postman request, add a custom header 'X-Client-Platform' with value 'Web', and execute it against reqres.in."
      }
    },

    // DAY 45
    {
      day: 45, phase: "APIs & Postman", phaseId: 3,
      title: "Authentication & Security: API Keys, Bearer Tokens & OAuth 2.0",
      difficulty: "Intermediate-Advanced", duration: 180,
      objectives: [
        "Master the distinction between Authentication (AuthN - who you are) and Authorization (AuthZ - what you can do).",
        "Implement API Key authentication via custom headers (`x-api-key`) and query parameters.",
        "Master JSON Web Tokens (JWT) and Bearer Token authentication via the `Authorization: Bearer <token>` header.",
        "Understand the OAuth 2.0 authorization code flow connecting third-party apps (Google Login, Account Aggregator banking permissions)."
      ],
      prerequisites: "Days 40-44 Postman requests and HTTP headers.",
      expectedOutcome: "The ability to configure secured API requests in Postman, understand JWT token architectures, and map OAuth 2.0 user permission flows.",
      topics: [
        {
          concept: "Authentication vs Authorization & Bearer Tokens",
          what: "Authentication verifies identity (e.g. logging in with username and password). Authorization verifies permissions (e.g. can this authenticated user refund a ₹50,000 transaction?).",
          why: "Financial APIs handle sensitive customer wealth data; every private endpoint must verify who is calling and whether they have permission.",
          how: "Upon login, the server returns a signed JWT Bearer Token. The client passes it in subsequent requests: `Authorization: Bearer <token>`.",
          example: "Header: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`.",
          businessCase: "Protecting customer portfolio balances from unauthorized viewing by other platform users.",
          pitfalls: "Storing authentication tokens in unencrypted local storage or passing sensitive tokens in plaintext URL query strings."
        },
        {
          concept: "The OAuth 2.0 Authorization Code Framework",
          what: "An industry-standard protocol allowing a third-party application to access user data on another service without the user sharing their password.",
          why: "When an investor connects their bank account via Account Aggregator or logs in with Google, they never give your app their bank password.",
          how: "1) User redirected to Bank/Google login screen -> 2) User grants permission -> 3) Bank returns Authorization Code -> 4) Backend exchanges Code for Access Token.",
          example: "Connecting bank statements via Setu or Anumati Account Aggregator for instant automated KYC verification.",
          businessCase: "Consent-driven financial data sharing under RBI Account Aggregator regulations.",
          pitfalls: "Confusing the temporary front-channel Authorization Code with the long-lived backend Access Token."
        }
      ],
      resources: [
        { title: "OAuth 2.0 and OpenID Connect Explained Visually", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+OAuth+2.0+Explained+Simply", time: "30 mins", covers: "Roles, authorization code flow, access tokens, and refresh tokens." },
        { title: "JWT (JSON Web Tokens) Introduction & Architecture", platform: "JWT.io", url: "https://jwt.io/introduction", time: "20 mins", covers: "Header, Payload, and Signature components of JSON Web Tokens." },
        { title: "Postman Official Guide: Authenticating API Requests", platform: "Postman Docs", url: "https://learning.postman.com/docs/sending-requests/authorization/authorization-types/", time: "25 mins", covers: "Configuring API Keys, Bearer Tokens, and OAuth 2.0 in Postman." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 44 Postman environment variables and requests." },
        { time: "50 mins", activity: "Concept Study: Study AuthN vs AuthZ, API Keys, JWT Bearer tokens, and OAuth 2.0 flows." },
        { time: "25 mins", activity: "Token Inspection: Inspect and decode a sample JWT token on JWT.io." },
        { time: "30 mins", activity: "Postman Auth Configuration: Configure Bearer Token authorization at Collection level." },
        { time: "40 mins", activity: "Practical Business Assignment: Account Aggregator OAuth 2.0 User Journey Document." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 45 assessment questions." }
      ],
      exercises: [
        {
          title: "Decode and Inspect a JWT Token on JWT.io",
          problem: "Take a sample JWT token, paste it into JWT.io, and identify the 3 components: Header (Algorithm), Payload (Claims, user_id, exp), and Signature.",
          scenario: "Understanding how backend tokens encode user identity without database lookups.",
          instructions: "1. Open https://jwt.io.\n2. Paste sample token.\n3. Inspect red (Header), purple (Payload), and blue (Signature).\n4. Locate `exp` (expiration timestamp) claim.",
          expectedOutput: "Decoded JSON claims showing user ID, role, and expiration date.",
          hint: "Header.Payload.Signature separated by dots.",
          solution: "JWT decoded; identified algorithm (HS256), payload claims (user_id, role, expiration), and cryptographic signature."
        },
        {
          title: "Configure Collection-Level Bearer Token in Postman",
          problem: "Configure a Bearer Token on the root collection so all requests in the collection automatically inherit authentication without re-typing.",
          scenario: "Establishing clean DRY (Don't Repeat Yourself) authentication in test suites.",
          instructions: "1. Click Collection > Authorization tab.\n2. Type = 'Bearer Token'.\n3. Token = `{{auth_token}}`.\n4. In individual request, verify Auth is set to 'Inherit auth from parent'.",
          expectedOutput: "All nested requests automatically send Authorization header.",
          hint: "Collection > Authorization tab > Type: Bearer Token.",
          solution: "Collection-level authorization configured using dynamic {{auth_token}} variable."
        },
        {
          title: "Simulate 401 Unauthorized vs 403 Forbidden",
          problem: "Send a request without an Authorization header to observe a 401 Unauthorized. Then send a token with 'user' role to an admin endpoint to observe 403 Forbidden.",
          scenario: "Verifying role-based access control (RBAC) behavior.",
          instructions: "1. Disable Authorization header > Send > Verify 401 Unauthorized.\n2. Add standard user token to admin endpoint > Send > Verify 403 Forbidden.",
          expectedOutput: "Clear demonstration of authentication vs authorization error responses.",
          hint: "401 = Missing token; 403 = Insufficient permissions.",
          solution: "Observed 401 when token was omitted; observed 403 when non-admin token attempted admin action."
        }
      ],
      assignment: {
        title: "FinTech Account Aggregator OAuth 2.0 Consent Architecture Document",
        scenario: "Document the user consent journey and technical API token exchange for connecting customer bank accounts via the RBI Account Aggregator framework.",
        deliverable: "Create a comprehensive technical workflow document:\n1. Step 1: User clicks 'Connect HDFC Bank' in the app.\n2. Step 2: App triggers API call receiving Consent Handle URL.\n3. Step 3: Webview opens official Account Aggregator consent screen.\n4. Step 4: User authenticates with Bank OTP and selects accounts to share.\n5. Step 5: AA redirects to mobile redirect URI with authorization code.\n6. Step 6: Backend server exchanges code for encrypted Data Artifact Access Token.\n7. Step 7: Backend fetches bank transaction statements via encrypted REST API.\n8. Document the security rationale: Why the fintech app never touches the customer's netbanking password.",
        completionCriteria: "Step-by-step sequence documentation linking user interaction, frontend redirects, backend token exchanges, and regulatory compliance."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary difference between Authentication and Authorization?", options: ["Authentication verifies WHO you are (identity); Authorization determines WHAT you are permitted to do (permissions).", "Authentication is for databases; Authorization is for APIs.", "They are synonyms.", "Authorization happens before authentication."], correct: 0, explanation: "Authentication verifies credentials (who you are); Authorization verifies permissions and access roles (what actions you can take)." },
          { question: "What are the three structural components of a JSON Web Token (JWT) separated by periods?", options: ["Username, Password, Pin", "Header, Payload, Signature", "Host, Port, Path", "Method, Status, Body"], correct: 1, explanation: "A JWT consists of Header (algorithm & token type), Payload (claims & user data), and Signature (cryptographic hash validating integrity)." },
          { question: "What standard HTTP header is used to pass a JWT access token in an API request?", options: ["`Token: <token>`", "`Authorization: Bearer <token>`", "`Auth: <token>`", "`Password: <token>`"], correct: 1, explanation: "The standard RFC 6750 header format for token authentication is `Authorization: Bearer <token>`." },
          { question: "In an OAuth 2.0 flow, why does the authorization server return an Authorization Code to the client instead of sending the Access Token directly to the browser?", options: ["It is an accidental historical bug.", "To ensure the actual Access Token is exchanged directly between the secure backend server and the auth server via back-channel, preventing token leakage in browser history.", "Because the code is smaller.", "To speed up the internet."], correct: 1, explanation: "Exchanging the temporary code via a secure server-to-server back-channel prevents access tokens from exposure in client browser address bars or mobile webviews." },
          { question: "What does the `exp` claim in a JWT payload represent?", options: ["Experience points of the user", "Expiration Unix timestamp after which the token is invalid", "Export format", "Expected response size"], correct: 1, explanation: "The `exp` claim contains the Unix epoch timestamp indicating when the token expires and must be rejected by servers." }
        ],
        scenarios: [
          { question: "Why do modern authentication architectures use short-lived Access Tokens (e.g. 15 minutes) paired with long-lived Refresh Tokens (e.g. 30 days)?", solution: "If an Access Token is intercepted by an attacker, the damage window is limited to 15 minutes. The Refresh Token is stored securely in an httpOnly cookie or secure mobile keychain, used only to fetch a new access token without forcing the user to log in repeatedly." },
          { question: "A developer accidentally committed an active production Stripe API Secret Key to GitHub. What immediate actions must be taken?", solution: "1) Immediately log into the Stripe dashboard and revoke/roll the compromised secret key. 2) Deploy a new key to production servers via secure environment variables. 3) Inspect API audit logs during the exposure window to verify no unauthorized transactions or data exports occurred. 4) Purge the key from Git history." },
          { question: "How does a backend server verify a JWT without querying the database on every single incoming API call?", solution: "The server verifies the cryptographic signature mathematically using its secret private key (HMAC SHA-256 or RSA). If the signature matches the header and payload, and the expiration timestamp (`exp`) has not passed, the server knows the token is authentic and untampered without needing a database lookup." }
        ],
        miniAssignment: "Write the exact HTTP header line to send a Bearer token with value 'xyz123token'."
      }
    },

    // DAY 46
    {
      day: 46, phase: "APIs & Postman", phaseId: 3,
      title: "Automated API Test Assertions & Collection Runners in Postman",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Master the Postman 'Tests' sandbox: writing JavaScript test assertions using `pm.test()` and Chai.js syntax.",
        "Assert critical API acceptance criteria: Status code checks (`pm.response.to.have.status(200)`), response latency (< 500ms), and header validation.",
        "Validate JSON response schema and assert specific property values (`pm.expect(jsonData.amount).to.eql(3000)`).",
        "Automate multi-request end-to-end regression testing using Postman Collection Runner."
      ],
      prerequisites: "Days 43-45 JSON schemas, Postman requests, and authentication.",
      expectedOutcome: "An automated regression test suite inside Postman that executes 10+ sequential API tests, validating status codes, response times, and business data logic in seconds.",
      topics: [
        {
          concept: "Postman Test Scripts & pm.test Assertions",
          what: "Postman includes a built-in Node.js JavaScript test sandbox that executes automatically after a response is received.",
          why: "Instead of manually eyeballing 50 API responses every morning to see if anything broke, automated test scripts validate status codes, latency, and JSON fields in 2 seconds.",
          how: "In the 'Tests' tab of a request: `pm.test(\"Status is 200\", function () { pm.response.to.have.status(200); });`.",
          example: "`pm.test(\"Verify Mandate is Active\", function () { var data = pm.response.json(); pm.expect(data.status).to.eql(\"ACTIVE\"); });`.",
          businessCase: "Automating sprint acceptance testing: verifying that all core payment endpoints pass regression tests before mobile app release.",
          pitfalls: "Writing assertions that fail if data order shifts slightly in an array, making tests brittle."
        },
        {
          concept: "Collection Runner & End-to-End Workflow Automation",
          what: "The Collection Runner executes every request in a folder or collection sequentially, chaining variables from one request into the next and outputting an executive test pass/fail report.",
          why: "Testing an end-to-end user journey requires chained execution: 1) Register User -> 2) Capture generated `user_id` -> 3) Create Bank Account -> 4) Place SIP Mandate.",
          how: "In Test tab of Request 1: `pm.environment.set(\"new_user_id\", pm.response.json().id);`. In Request 2 URL: `/users/{{new_user_id}}/mandates`. Run Collection.",
          example: "Executing a 15-request regression suite in 8 seconds with 45 passing assertions.",
          businessCase: "Daily automated smoke testing verifying that payment rails are operational before business hours.",
          pitfalls: "Running test suites against production databases without sandbox isolation, creating fake transactions on real banking rails."
        }
      ],
      resources: [
        { title: "Write API Tests in Postman: Complete Guide", platform: "Postman Learning Center", url: "https://learning.postman.com/docs/writing-scripts/test-scripts/", time: "30 mins", covers: "Official guide to pm.test, pm.expect, response assertions, and snippets." },
        { title: "Postman API Automation & Collection Runner Tutorial", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+Postman+API+Testing+Collection+Runner", time: "35 mins", covers: "Writing test assertions, running collections, and chaining environment variables." },
        { title: "Chai Assertion Library Cheat Sheet for Postman", platform: "ChaiJS", url: "https://www.chaijs.com/api/bdd/", time: "20 mins", covers: "expect, to.be, to.have, and to.equal syntax reference." }
      ],
      timetable: [
        { time: "15 mins", activity: "Revision: Review Day 45 Bearer tokens and authorization headers." },
        { time: "50 mins", activity: "Concept Study: Study pm.test syntax, Chai assertions, dynamic variable extraction, and Collection Runner." },
        { time: "25 mins", activity: "Hands-on Scripting: Write status code, latency, and JSON body assertions in Postman." },
        { time: "30 mins", activity: "Independent Exercises: Solve the 3 API test scripting challenges." },
        { time: "40 mins", activity: "Practical Business Assignment: Build End-to-End FinTech Automated Regression Test Suite." },
        { time: "20 mins", activity: "Quiz & Review: Complete Day 46 assessment questions." }
      ],
      exercises: [
        {
          title: "Write Status Code and Response Latency Assertions",
          problem: "In Postman, write two automated test assertions: 1) Verify HTTP status is 200 OK; 2) Verify response latency is under 400 milliseconds.",
          scenario: "Enforcing non-functional performance SLA requirements in API testing.",
          instructions: "1. In request 'Tests' tab, write: `pm.test(\"Status code is 200\", () => pm.response.to.have.status(200));`.\n2. Write: `pm.test(\"Response time < 400ms\", () => pm.expect(pm.response.responseTime).to.be.below(400));`.\n3. Send request and inspect 'Test Results' tab.",
          expectedOutput: "Two green passing test badges (PASS 2/2).",
          hint: "pm.expect(pm.response.responseTime).to.be.below(400)",
          solution: "pm.test(\"Status code is 200\", () => pm.response.to.have.status(200));\npm.test(\"Response time is below 400ms\", () => pm.expect(pm.response.responseTime).to.be.below(400));"
        },
        {
          title: "Validate JSON Response Schema and Data Values",
          problem: "For a GET user request returning `{\"data\": {\"id\": 2, \"email\": \"janet.weaver@reqres.in\", \"first_name\": \"Janet\"}}`, assert that `id` equals 2 and `first_name` is a string.",
          scenario: "Validating data integrity in customer profile responses.",
          instructions: "1. Parse JSON: `const res = pm.response.json();`.\n2. Assert: `pm.expect(res.data.id).to.eql(2);`.\n3. Assert: `pm.expect(res.data.first_name).to.be.a(\"string\");`.",
          expectedOutput: "Green passing test results validating response payload values.",
          hint: "pm.expect(res.data.first_name).to.be.a('string')",
          solution: "const res = pm.response.json();\npm.test(\"User ID is 2\", () => pm.expect(res.data.id).to.eql(2));\npm.test(\"First Name is string\", () => pm.expect(res.data.first_name).to.be.a(\"string\"));"
        },
        {
          title: "Extract Response ID into Environment Variable for Chaining",
          problem: "In a POST user registration request returning `{\"id\": \"742\", \"createdAt\": \"...\"}`, extract `id` and save it to environment variable `newly_created_user_id`.",
          scenario: "Automating end-to-end test workflow chaining.",
          instructions: "1. Parse JSON: `const res = pm.response.json();`.\n2. Save variable: `pm.environment.set(\"newly_created_user_id\", res.id);`.\n3. In subsequent request, use `{{newly_created_user_id}}`.",
          expectedOutput: "Environment variable automatically populated upon request execution.",
          hint: "pm.environment.set('variable_name', value)",
          solution: "const res = pm.response.json();\npm.environment.set(\"newly_created_user_id\", res.id);\npm.test(\"User ID captured\", () => pm.expect(res.id).to.not.be.null);"
        }
      ],
      assignment: {
        title: "Automated FinTech Regression Test Suite & Collection Runner",
        scenario: "Build an automated regression test suite verifying the end-to-end investment user journey.",
        deliverable: "1. Configure 5 sequential requests in a Postman Collection: `Register User` -> `Get Profile` -> `Add Bank Account` -> `Create SIP Mandate` -> `Execute First Payment`.\n2. In each request, author at least 3 automated test assertions: Status Code check, Response Latency check, and JSON payload business assertion.\n3. Chain generated IDs from Request 1 to Request 5 using `pm.environment.set()`.\n4. Open Collection Runner > Select Collection > Click 'Run FinTech Suite'.\n5. Generate and review the final execution summary report showing 15/15 passing assertions.",
        completionCriteria: "Automated collection runner execution completing with 100% passing test assertions and zero manual interventions."
      },
      assessment: {
        mcqs: [
          { question: "Which tab in Postman is used to write JavaScript assertions that execute after an HTTP response is received?", options: ["Params tab", "Headers tab", "Pre-request Script tab", "Tests tab"], correct: 3, explanation: "The 'Tests' tab executes JavaScript test code immediately after the response is received, evaluating assertions against the response." },
          { question: "What JavaScript method is used in Postman to save a value into an active environment variable?", options: ["`localStorage.setItem()`", "`pm.environment.set(\"key\", value)`", "`postman.save(\"key\")`", "`setVariable(\"key\")`"], correct: 1, explanation: "`pm.environment.set(\"key\", value)` programmatically stores a value in the currently selected Postman environment." },
          { question: "What is the primary function of the Postman Collection Runner?", options: ["To delete old requests.", "To execute every request in a collection or folder sequentially, validating automated test assertions and generating a pass/fail report.", "To convert JSON into Excel.", "To run Python scripts."], correct: 1, explanation: "Collection Runner automates batch execution of multi-request collections, running test scripts and reporting cumulative pass/fail results." },
          { question: "How do you assert that a response took less than 500 milliseconds in Postman?", options: ["`assert.time < 500`", "`pm.expect(pm.response.responseTime).to.be.below(500);`", "`pm.time(500)`", "`test.latency(500)`"], correct: 1, explanation: "`pm.expect(pm.response.responseTime).to.be.below(500)` uses Chai assertion syntax to validate response latency." },
          { question: "What happens if a single test assertion inside `pm.test()` fails during execution?", options: ["The computer shuts down.", "That specific test is marked as FAILED (red badge) in the test results, while the remaining test assertions continue to evaluate.", "Postman deletes the request.", "The response body is erased."], correct: 1, explanation: "A failed assertion flags the test as FAILED with the exact failure message, allowing you to pinpoint the regression immediately." }
        ],
        scenarios: [
          { question: "How does automated API testing in Postman save QA and Business Analysis time compared to manual testing through the mobile app UI?", solution: "Manual UI testing requires typing form inputs, tapping buttons, and waiting for animations on a phone screen (taking 3-5 minutes per test case). Postman test scripts execute the raw HTTP requests directly against the server, completing a 20-step user journey in 3 seconds with automated mathematical validation." },
          { question: "A test fails with error: 'TypeError: Cannot read properties of undefined (reading \"id\")'. What is the root cause and how do you prevent it?", solution: "The server returned an error response (like a 500 HTML error page or empty object) that did not contain the expected `data` wrapper. Always assert status code first (`pm.response.to.have.status(200)`), and check object existence before accessing nested properties: `pm.expect(res).to.have.property('data')`." },
          { question: "What is Newman, and how does it relate to Postman automated test collections?", solution: "Newman is Postman's open-source command-line runner. It allows you to run Postman collections from the terminal and embed automated API tests directly into CI/CD deployment pipelines (like GitHub Actions), blocking code deployments if any API test fails." }
        ],
        miniAssignment: "Write a Postman test snippet verifying that the response header 'Content-Type' contains 'application/json'."
      }
    },

    // DAY 47 (Phase 4 Exam)
    {
      day: 47, phase: "APIs & Postman", phaseId: 3,
      title: "Phase 4 Comprehensive Examination: RESTful API Test Suite & Documentation",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Evaluate comprehensive mastery across all Phase 4 competencies (Days 40–46).",
        "Test high-speed proficiency in REST architecture, HTTP methods, status code taxonomies, JSON payloads, and Postman test automation.",
        "Execute and audit an end-to-end FinTech API test suite under timed examination conditions.",
        "Achieve the mandatory 75% examination pass mark to unlock Phase 5 (Portfolio, Interview Prep & Capstone)."
      ],
      prerequisites: "Completion of Days 40 through 46 modules and assignments.",
      expectedOutcome: "Certified Phase 4 API completion badge and a production-grade automated Postman test collection verifying core FinTech payment workflows.",
      topics: [
        {
          concept: "Phase 4 Competency Synthesis: The API Product Lifecycle",
          what: "Holistic synthesis of how a Business Analyst bridges stakeholder requirements, API technical contracts (OpenAPI/Swagger), Postman test validation, and frontend integration.",
          why: "In modern tech companies, Business Analysts and Product Analysts who understand APIs command 30-40% higher market compensation because they speak the exact technical language of backend engineering.",
          how: "Review the entire lifecycle: Requirements -> REST Schema Design -> Postman Test Collection -> Sprint Acceptance Validation.",
          example: "Documenting an 'Automated Smart SIP Retry Engine' feature in Jira with exact endpoint paths, status codes, and JSON schemas.",
          businessCase: "Demonstrating to hiring managers that you are a technical, credible Business Analyst who works seamlessly with engineering teams.",
          pitfalls: "Treating APIs as purely developer territory and assuming BAs only write visual UI requirements."
        },
        {
          concept: "Writing Technical API Acceptance Criteria in User Stories",
          what: "Writing User Stories that include explicit technical API acceptance criteria (Endpoints, Methods, Request Body schema, Expected Status Codes, and Error Responses).",
          why: "Generic stories ('User can invest in mutual funds') lead to developer confusion and missed edge cases. Technical stories prevent sprint rework and clarify edge-case handling.",
          how: "Structure: 'Given user is logged in, When user taps Submit, Client shall send POST `/api/v1/investments`. Then server shall return 201 Created with `txn_id`. If balance is insufficient, server shall return 422 with `INSUFFICIENT_FUNDS`.'",
          example: "Acceptance criteria specifying exact Gherkin Given-When-Then statements tied to HTTP responses.",
          businessCase: "Standard technical requirement format expected at top-tier FinTech firms (CRED, Razorpay, Zerodha, Groww).",
          pitfalls: "Writing vague user stories that omit HTTP status codes and error payload definitions."
        }
      ],
      resources: [
        { title: "How to Write Technical User Stories for APIs (BA Guide)", platform: "Postman Learning Center", url: "https://learning.postman.com/docs/publishing-your-api/documenting-your-api/", time: "25 mins", covers: "API documentation best practices and technical specifications." },
        { title: "Top 15 API & Postman Interview Questions for Business Analysts", platform: "freeCodeCamp", url: "https://www.youtube.com/results?search_query=freeCodeCamp+API+Interview+Questions+for+Business+Analysts", time: "35 mins", covers: "REST vs SOAP, status codes, authentication, and test automation." },
        { title: "Phase 4 Review & Transition to Capstone Portfolio", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Business+Analyst+Technical+Skills", time: "25 mins", covers: "Connecting Excel, SQL, Power BI, and APIs into a unified portfolio." }
      ],
      timetable: [
        { time: "15 mins", activity: "Phase 4 Speed Drill: Rapid HTTP methods and status code flashcards." },
        { time: "50 mins", activity: "Postman Test Execution: Run automated regression collection and verify all assertions." },
        { time: "25 mins", activity: "Technical User Story Authoring: Write 2 API-driven user stories with Gherkin criteria." },
        { time: "30 mins", activity: "Portfolio Documentation: Export Postman Collection JSON and attach to project files." },
        { time: "40 mins", activity: "Phase 4 Certification Exam: Complete the 25-question technical evaluation." },
        { time: "20 mins", activity: "Results Analysis & Portfolio Roadmap: Review missed questions and preview Phase 5." }
      ],
      exercises: [
        {
          title: "Timed Challenge 1: Author Technical Gherkin User Story for SIP Debit",
          problem: "Write a complete User Story with Gherkin Acceptance Criteria (Given-When-Then) for an automated recurring SIP payment debit, covering both success (200) and failure (422).",
          scenario: "Sprint grooming technical story preparation.",
          instructions: "1. User Story: 'As a customer with an active SIP...'.\n2. Scenario 1: Successful payment debit (200 OK).\n3. Scenario 2: Insufficient funds (422 Unprocessable Entity).",
          expectedOutput: "Professional Gherkin requirement specification.",
          hint: "Given, When, Then syntax tied to HTTP status codes.",
          solution: "Feature: Automated SIP Debit\nScenario: Successful debit\nGiven customer has active mandate #401\nWhen backend triggers POST /api/v1/mandates/401/debit\nThen server returns 200 OK with status 'CAPTURED'\n\nScenario: Insufficient balance\nGiven customer account has balance < monthly_amount\nWhen backend triggers POST /api/v1/mandates/401/debit\nThen server returns 422 Unprocessable with error 'INSUFFICIENT_FUNDS'."
        },
        {
          title: "Timed Challenge 2: Multi-Assertion Postman Test Script",
          problem: "Write a Postman test script for a payment endpoint verifying 3 things in a single test script: 1) Status is 200 or 201; 2) Response time < 500ms; 3) Body contains non-null `transaction_id`.",
          scenario: "Quality assurance smoke test.",
          instructions: "1. In Tests tab, write assertions using Chai syntax.\n2. Execute and verify all 3 pass.",
          expectedOutput: "Clean JavaScript test script validating 3 conditions.",
          hint: "pm.expect(pm.response.code).to.be.oneOf([200, 201])",
          solution: "pm.test(\"Status is 200 or 201\", () => pm.expect(pm.response.code).to.be.oneOf([200, 201]));\npm.test(\"Response time < 500ms\", () => pm.expect(pm.response.responseTime).to.be.below(500));\npm.test(\"Txn ID present\", () => pm.expect(pm.response.json().transaction_id).to.not.be.undefined);"
        },
        {
          title: "Timed Challenge 3: Security & Header Audit",
          problem: "Identify the security vulnerability in an API call passing an API key in the URL: `GET /api/v1/balance?api_key=secret_live_98124`. How must it be rewritten?",
          scenario: "Security and compliance audit review.",
          instructions: "1. Explain why URL query strings are vulnerable.\n2. Rewrite the request using a secure custom header.",
          expectedOutput: "Technical security remediation plan.",
          hint: "Query strings are logged in plain text in browser histories, proxy logs, and web server access logs.",
          solution: "Vulnerability: URLs are recorded in plain text in server access logs, browser history, and proxy caches. Fix: Move the secret key to an encrypted request header: `X-API-Key: secret_live_98124` or use `Authorization: Bearer <token>` over HTTPS."
        }
      ],
      assignment: {
        title: "Phase 4 Certification Examination: RESTful API Test Suite & Documentation",
        scenario: "Complete the comprehensive 25-question technical exam covering REST architecture, HTTP methods, status codes, JSON formatting, and Postman test automation.",
        deliverable: "1. Complete all 5 assessment MCQs (passing mark >= 75%).\n2. Solve the 3 advanced API scenario challenges.\n3. Export your completed Postman collection as `FinTech_API_TestSuite.json`.\n4. Log completion badge in your personal dashboard.",
        completionCriteria: "Attain >= 75% on the certification assessment and successfully log completion in your dashboard."
      },
      assessment: {
        mcqs: [
          { question: "Why should sensitive credentials (like passwords or API secret keys) NEVER be passed in URL query parameters (e.g. `?key=123`)?", options: ["URLs only support numbers.", "URLs are recorded in plain text across server access logs, proxy caches, browser histories, and network monitoring tools, exposing the credentials.", "URLs are encrypted automatically.", "It is slower."], correct: 1, explanation: "Query parameters are visible in browser history and logged in plaintext in web server access logs, making them vulnerable to interception." },
          { question: "What is the primary difference between a PUT request and a PATCH request in RESTful APIs?", options: ["PUT is for creating; PATCH is for deleting.", "PUT replaces the entire resource representation; PATCH modifies only the specific fields supplied in the request body.", "PUT is obsolete.", "PATCH only works on numbers."], correct: 1, explanation: "PUT is a full replacement; PATCH is a partial update modifying only the attributes provided in the payload." },
          { question: "Which HTTP status code communicates that an API request was syntactically valid JSON, but was rejected because of a business rule violation (e.g. invalid PAN card format or account locked)?", options: ["200 OK", "404 Not Found", "422 Unprocessable Entity", "502 Bad Gateway"], correct: 2, explanation: "422 Unprocessable Entity is the industry standard code for semantic and business validation failures." },
          { question: "What is Newman in the Postman ecosystem?", options: ["A paid customer support tool.", "The open-source command-line tool that executes Postman collections directly in terminals and CI/CD pipelines.", "A database connector.", "A visual theme."], correct: 1, explanation: "Newman allows running Postman collections headlessly from command-line terminals and automated deployment pipelines." },
          { question: "Why is writing technical API acceptance criteria (endpoints, methods, status codes) valuable in a Business Analyst's user story?", options: ["It eliminates the need for developers.", "It prevents ambiguity, clarifies edge-case error handling, aligns frontend and backend teams, and provides exact test cases for QA.", "It makes stories longer.", "It is required by Jira."], correct: 1, explanation: "Technical acceptance criteria eliminate ambiguity, ensuring developers and QA share the exact same definition of done." }
        ],
        scenarios: [
          { question: "In an interview, the hiring manager asks: 'How does your understanding of APIs make you a stronger Business Analyst than someone who only knows Excel?' How do you answer?", solution: "Excel and SQL give me the ability to analyze historical data after it lands in the database. But APIs allow me to understand how that data is created, validated, and transferred in real time. I can write technical requirements that engineering teams respect, troubleshoot production payment issues across microservices, and design realistic product features that bridge customer UX and technical feasibility." },
          { question: "How do you explain the concept of an Idempotency Key in payment processing APIs?", solution: "An Idempotency Key is a unique identifier (like a UUID) sent by the mobile app in an HTTP header (`X-Idempotency-Key`) when initiating a payment. If a network blip occurs and the user accidentally taps 'Pay' twice, the server recognizes the duplicate key and returns the cached result of the first payment without executing a second debit, protecting customers from double charges." },
          { question: "How will your API knowledge directly enhance your final Capstone Portfolio Project in Phase 5?", solution: "In Phase 5, our project analyzes FinTech Investment Operations. Rather than treating payment failures as abstract numbers in a database, I understand the exact REST API requests, webhook payloads, and status codes that generated those failure records, enabling me to write a comprehensive Business Requirement Document (BRD) with technical credibility." }
        ],
        miniAssignment: "Review all Phase 4 concepts, save your Postman collection export, and prepare your workspace for Phase 5: Portfolio, Interview Prep, and Career Transition."
      }
    },
    // DAY 48
    {
      day: 48, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Capstone Project 2 Scoping: FinTech Investment Operations & SIP Analytics",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Define the business problem, executive scope, and success criteria for an enterprise FinTech portfolio capstone.",
        "Establish an exhaustive KPI dictionary covering AUM, Monthly GMV, Active SIP Mandates, Gateway Failure Rates, and Net New Money.",
        "Map technical data flows from customer SIP mandate registration to nodal bank settlement.",
        "Author a formal Project Charter to anchor the capstone in real-world business context."
      ],
      prerequisites: "Completion of Phases 1 through 4 (Excel, SQL, Power BI, and APIs).",
      expectedOutcome: "A formal Project Charter, KPI dictionary, and architectural workflow document for the primary portfolio capstone.",
      topics: [
        {
          concept: "FinTech Investment Operations & Mandate Lifecycle",
          what: "The operational journey of automated recurring mutual fund investments (SIPs) from customer e-mandate registration (via NPCI / NACH) to monthly debit, nodal bank clearing, and AMC allotment.",
          why: "Hiring managers look for domain depth; understanding payment rails, nodal settlements, and mandate lifecycles distinguishes high-caliber BAs from generic data crunchers.",
          how: "Map each state transition: Mandate Created -> Approved by NPCI -> Active -> Scheduled Debit -> Gateway Request -> Captured / Failed -> Nodal Settlement -> Unit Allotment.",
          example: "A customer registers a ₹5,000/month SIP in Tata Digital India Fund; on the 5th of each month, the system sends an automated debit request through Razorpay/Cashfree to HDFC Bank.",
          businessCase: "Diagnosing why a 4.2% failure rate on auto-debits leads to ₹85 Lakhs of lost monthly GMV and elevated customer support tickets.",
          pitfalls: "Treating transactions as single isolated events rather than part of an ongoing recurring mandate lifecycle."
        },
        {
          concept: "FinTech Operational KPI Dictionary",
          what: "A standardized catalog defining operational and executive metrics, formulas, data sources, and business targets.",
          why: "Eliminates metric ambiguity across business, product, operations, and engineering teams.",
          how: "Document: Metric Name, Technical Formula, Data Source Tables, SLA Threshold, Business Owner.",
          example: "Gateway Success Rate % = (COUNT(Successful Txns) / COUNT(Total Attempted Txns)) * 100, Target >= 95.0%.",
          businessCase: "Creating a single source of truth for executive dashboards and daily operations standups.",
          pitfalls: "Using mismatched definitions across teams (e.g. Finance counting gross settled volume while Operations counts initiated attempts)."
        },
        {
          concept: "Capstone Project Charter & Stakeholder Alignment",
          what: "A one-page executive charter summarizing the business context, project objectives, data scope, target deliverables, and team responsibilities.",
          why: "Demonstrates your structured Business Analyst mindset to recruiters right at the top of your portfolio.",
          how: "Sections: 1. Executive Summary; 2. Problem Statement; 3. Core Objectives; 4. In-Scope / Out-of-Scope; 5. Expected Business Impact; 6. Deliverables Matrix.",
          example: "Project Charter: 'FinTech SIP Mandate Failure Reduction & Operations Intelligence Platform'.",
          businessCase: "Directly mirrors enterprise agile documentation practices at top tier fintechs (Zerodha, Groww, Razorpay, CRED).",
          pitfalls: "Jumping directly into building SQL queries or dashboards without first scoping business value and success metrics."
        }
      ],
      resources: [
        { title: "Understanding NACH, e-Mandates, and SIP Payment Rails in India", platform: "NPCI Developer Portal & FinTech Guide", url: "https://www.npci.org.in/what-we-do/nach/product-overview", time: "30 mins", covers: "Recurring mandate lifecycles and settlement mechanisms." },
        { title: "How to Scope a Business Analytics & BA Project", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Portfolio+Project+Planning", time: "30 mins", covers: "Project scoping, business requirements, and portfolio presentation." },
        { title: "Key Performance Indicators (KPIs) in FinTech & WealthTech", platform: "Corporate Finance Institute", url: "https://corporatefinanceinstitute.com/resources/management/kpi-key-performance-indicators/", time: "25 mins", covers: "AUM, Churn, GMV, and customer acquisition metrics." }
      ],
      timetable: [
        { time: "15 mins", activity: "Portfolio Strategy Review: Review recruiter rubric and target job competencies." },
        { time: "50 mins", activity: "Mandate Lifecycle Deep Dive: Study NACH e-mandate rails, status states, and gateway failure reasons." },
        { time: "25 mins", activity: "KPI Dictionary Authoring: Formulate 10 core operational metrics with exact business logic." },
        { time: "30 mins", activity: "Guided Exercise Practice: Complete stakeholder matrix and process flow diagram." },
        { time: "40 mins", activity: "Business Assignment: Author the formal Project Charter markdown document." },
        { time: "20 mins", activity: "Knowledge Assessment: 5 MCQs and 3 scenario challenges on project scoping." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Map the SIP Payment Mandate State Machine",
          problem: "Draw the state flow diagram for an automated recurring SIP investment, identifying at least 6 distinct transaction states and failure branches.",
          scenario: "Scoping the data requirements for customer transaction lifecycle tracking.",
          instructions: "1. Identify the starting state.\n2. Detail the processing states.\n3. Identify terminal states (Success vs Terminal Failure vs Retrying).\n4. Specify what triggers each transition.",
          expectedOutput: "A structured state-transition specification table.",
          hint: "States: INITIATED, PENDING_MANDATE_AUTH, ACTIVE, TRIGGERED, CAPTURED, FAILED_RETRYABLE, FAILED_TERMINAL.",
          solution: "State Flow:\n1. INITIATED -> Customer sets up SIP in app.\n2. PENDING_MANDATE_AUTH -> Bank mandate OTP/netbanking verification.\n3. ACTIVE -> Mandate registered with NPCI.\n4. TRIGGERED -> Scheduled monthly debit sent to payment gateway.\n5. CAPTURED -> Funds successfully debited (terminal success).\n6. FAILED_RETRYABLE -> Gateway timeout or temporary bank network error (trigger auto-retry in 24h).\n7. FAILED_TERMINAL -> Insufficient funds or invalid account (stop retry, alert user)."
        },
        {
          title: "Guided Exercise 2: Design the FinTech Operational KPI Dictionary",
          problem: "Create a 5-metric KPI table specifying: Metric Name, Business Definition, Calculation Formula, Target SLA, and Action Trigger.",
          scenario: "Operations team alignment meeting.",
          instructions: "Define metrics for: 1) Gateway Success Rate, 2) Mandate Drop-off Rate, 3) Average Recovery on Retry, 4) Monthly GMV Growth %, 5) Active SIP Retention Rate.",
          expectedOutput: "A structured 5-row KPI dictionary with formulas and thresholds.",
          hint: "Ensure formulas use exact math (numerator / denominator * 100).",
          solution: "1. Gateway Success Rate: (Captured Txns / Total Attempted) * 100 | Target >= 95% | Action: Alert on-call if < 92%.\n2. Mandate Drop-off Rate: (Abandoned Mandates / Initiated Mandates) * 100 | Target <= 15% | Action: Optimize banking partner UX.\n3. Retry Recovery Rate: (Successful Retries / Total Failed Retries Attempted) * 100 | Target >= 40% | Action: Adjust retry timing windows.\n4. GMV Growth: ((Current Month GMV - Last Month GMV) / Last Month GMV) * 100 | Target >= 8% MoM | Action: Review fund marketing.\n5. SIP Retention: (Active SIPs at end of month / Active SIPs at start) * 100 | Target >= 96% | Action: Investigate cancellation reasons."
        },
        {
          title: "Guided Exercise 3: Stakeholder Needs Matrix",
          problem: "Identify 3 key stakeholder personas (Executive Leadership, Operations Manager, Product Manager) and map their primary decision needs to specific report components.",
          scenario: "Portfolio user empathy mapping.",
          instructions: "For each persona, document: 1) Their core question, 2) The metrics they review, 3) What action they take.",
          expectedOutput: "A clear 3-persona stakeholder matrix.",
          hint: "Executives want high-level trends; Operations wants live exceptions; Product wants funnel conversion.",
          solution: "1. VP of Operations: Core question: 'Which bank gateway is underperforming today?' Metrics: Hourly gateway success %, SLA breach count. Action: Re-route traffic to secondary gateway.\n2. Product Manager: Core question: 'Where are users dropping off during mandate setup?' Metrics: Step-by-step funnel drop-off %. Action: Redesign bank authentication screen.\n3. Chief Business Officer: Core question: 'Are we hitting our monthly AUM and GMV targets?' Metrics: Total AUM, Net New Money, Active Investor count. Action: Board reporting and investor updates."
        }
      ],
      assignment: {
        title: "Author the Official Project Charter for Capstone Portfolio",
        scenario: "You are initiating the flagship capstone project for your job transition portfolio: 'FinTech SIP Mandate Failure Reduction & Operations Intelligence Platform'.",
        deliverable: "1. Project title, author, and date.\n2. Executive summary (2 paragraphs).\n3. Business problem statement with quantifiable impact ($/₹ lost, failure rates).\n4. In-Scope and Out-of-Scope boundaries.\n5. Deliverables checklist (Data Dictionary, SQL Analytical Suite, Excel Financial Model, Power BI Dashboard, BRD).\n6. Save as `01_PROJECT_CHARTER.md`.",
        completionCriteria: "Complete Project Charter covering all 6 sections with professional FinTech domain depth."
      },
      assessment: {
        mcqs: [
          { question: "Why is defining the Project Charter and KPI Dictionary essential before touching SQL or Power BI?", options: ["It satisfies a corporate requirement without affecting the final dashboard.", "It ensures you build analytical solutions that solve real business problems rather than creating pretty visuals with no operational utility.", "It is required to purchase a Power BI license.", "It takes the place of data cleaning." ], correct: 1, explanation: "An analytical project without a clear business problem statement results in unfocused dashboards that fail to drive business action." },
          { question: "What is an e-Mandate in the Indian FinTech ecosystem?", options: ["An email newsletter sent to investors.", "An automated authorization registered with NPCI / banks permitting recurring debits up to an approved limit without repeated OTPs.", "A manual cheque submitted to a mutual fund branch.", "A temporary password." ], correct: 1, explanation: "e-Mandates allow recurring debits for SIPs via NPCI's NACH e-mandate rails, revolutionizing wealthtech automation." },
          { question: "If payment gateway Razorpay has a 94.2% success rate and Cashfree has a 96.8% success rate, what should an automated smart router do?", options: ["Route 100% of volume to Razorpay.", "Dynamically shift transaction traffic toward Cashfree while alerting operations to investigate Razorpay's failure modes.", "Shut down the entire platform.", "Convert all payments to cash." ], correct: 1, explanation: "Smart payment routing allocates traffic dynamically to higher-performing rails, maximizing overall GMV capture." },
          { question: "What is Net New Money (NNM) in wealth management?", options: ["Fresh currency printed by the Reserve Bank.", "New investment inflows minus customer withdrawals / redemptions during a given period.", "The profit earned by the software company.", "The balance in a user's wallet." ], correct: 1, explanation: "Net New Money measures genuine portfolio growth by subtracting redemption outflows from gross investment inflows." },
          { question: "In a Business Analyst's project charter, what is the role of an 'Out-of-Scope' section?", options: ["To list features that failed during testing.", "To set clear boundaries and prevent scope creep, specifying what the project deliberately will NOT deliver.", "To criticize previous teams' work.", "To hide unfinished tasks." ], correct: 1, explanation: "Out-of-Scope boundaries protect project timelines by explicitly defining items that will not be addressed in the current release." }
        ],
        scenarios: [
          { question: "In an interview, the interviewer asks: 'Tell me about the most impactful analytical project you worked on recently.' How do you introduce this Capstone?", solution: "I led an end-to-end FinTech Operations Analytics project analyzing ₹18.5 Crore in recurring mutual fund SIP investments. The core challenge was that a 4.8% payment gateway failure rate was leaking over ₹85 Lakhs in monthly gross transaction volume. I designed a multi-table relational data model in SQL, built an automated failure diagnostic suite, created an executive Power BI operations dashboard, and authored the Business Requirement Document (BRD) specifying dynamic smart-routing logic." },
          { question: "Why is a 4% failure rate in recurring SIP investments far more dangerous to a business than a 4% failure rate in e-commerce shopping?", solution: "In e-commerce, a failed checkout is a single lost transaction that the customer might retry immediately. But in SIP investments, a failed recurring debit disrupts the investor's monthly wealth-building habit, triggers banking partner penalty charges, and often leads to permanent mandate cancellation, destroying long-term Customer Lifetime Value (LTV) and AUM." },
          { question: "How does having a well-defined KPI Dictionary protect an analyst during cross-functional meetings with engineering and finance?", solution: "It eliminates subjective disputes over conflicting numbers. When engineering says 'uptime was 99.5%' and finance says 'success rate was only 93%', the analyst points to the KPI dictionary to show that server uptime measures system availability while gateway success rate measures completed bank debits." }
        ],
        miniAssignment: "Draft a 1-sentence elevator pitch for your Capstone Project highlighting: 1) The business problem, 2) The analytical tools used, and 3) The quantifiable business outcome."
      }
    },
    // DAY 49
    {
      day: 49, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Synthetic FinTech Dataset Generation & Data Dictionary [Weekly Assessment 7]",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Architect a 7-table normalized relational schema mimicking a production wealthtech platform.",
        "Author an exhaustive Data Dictionary detailing primary keys, foreign keys, data types, constraints, and business definitions.",
        "Generate realistic synthetic data (5,000+ records) with intentional edge cases (failed retries, mandate drop-offs, gateway timeouts).",
        "Complete Weekly Assessment 7 consolidating API architecture and Capstone project foundations."
      ],
      prerequisites: "Relational database concepts (Phase 2) and Capstone Scoping (Day 48).",
      expectedOutcome: "A complete 7-table FinTech Data Dictionary and populated synthetic SQL database ready for analytical querying.",
      topics: [
        {
          concept: "Enterprise FinTech Relational Schema Design",
          what: "A 7-table normalized database model representing customer investment journeys: `dim_users`, `dim_kyc`, `dim_mutual_funds`, `dim_payment_gateways`, `fact_mandates`, `fact_transactions`, and `fact_retries`.",
          why: "Demonstrating how transactions connect back to mandates, users, and gateway rails proves technical database architecture fluency.",
          how: "Identify relationships: `dim_users` 1:1 with `dim_kyc`; `dim_users` 1:N with `fact_mandates`; `fact_mandates` 1:N with `fact_transactions`; `fact_transactions` 1:N with `fact_retries`.",
          example: "User `USR-1001` has mandate `MND-801` for Tata Digital India Fund; each monthly execution generates a transaction `TXN-90214` routed through Razorpay.",
          businessCase: "Structuring tables to support rapid drill-down from executive AUM cards down to individual payment gateway failure codes.",
          pitfalls: "Denormalizing all columns into a single flat CSV file, which conceals relational understanding and causes data update anomalies."
        },
        {
          concept: "Professional Data Dictionary Authoring",
          what: "A comprehensive reference document defining every table, column, data type, nullability, key role, sample values, and operational business rules.",
          why: "Standard practice in enterprise data engineering and business analysis; it allows hiring managers to immediately understand your dataset.",
          how: "Columns: Table Name, Column Name, Data Type, Key Type (PK/FK/None), Nullable (Y/N), Allowed Values / Constraints, Business Description.",
          example: "`fact_transactions.status`: VARCHAR(20), Not Null, Allowed: ['INITIATED', 'CAPTURED', 'FAILED', 'PENDING', 'REFUNDED'], Description: 'Terminal status of transaction attempt.'",
          businessCase: "Used during sprint planning to ensure backend engineers, data engineers, and BI analysts use identical column definitions.",
          pitfalls: "Omitting data constraints (e.g. not specifying whether `amount` can be negative or zero)."
        },
        {
          concept: "Injecting Realistic FinTech Edge Cases & Failure Modes",
          what: "Simulating realistic operational data that includes bank nodal downtime, expired e-mandates, network timeouts, and retry attempts.",
          why: "Perfect synthetic data with 100% success rates fails to impress hiring managers; real value lies in diagnosing operational failures.",
          how: "Configure simulated failure distributions: 92% successful, 4% insufficient balance, 2.5% bank server timeout (HTTP 504), 1.5% invalid mandate status.",
          example: "A cluster of 150 transactions failing exclusively between 02:00 AM and 04:00 AM on HDFC Bank gateway due to scheduled core banking maintenance.",
          businessCase: "Provides the raw material for deep-dive root-cause SQL queries on Day 51.",
          pitfalls: "Using uniform random numbers that create unrealistic scenarios (e.g. transactions occurring evenly at all seconds of the day)."
        }
      ],
      resources: [
        { title: "Database Design for Financial Systems & Payment Processing", platform: "PostgreSQL Tutorial & Guide", url: "https://www.postgresqltutorial.com/postgresql-database-design/", time: "35 mins", covers: "Schema normalization, constraints, and relational integrity." },
        { title: "How to Build a Professional Data Dictionary for Analysts", platform: "Towards Data Science", url: "https://towardsdatascience.com/how-to-write-a-data-dictionary-for-data-analysis-projects-c97b87c7e390", time: "25 mins", covers: "Table mapping, schema documentation, and markdown templates." },
        { title: "Generating Realistic Mock Data with Mockaroo & Python", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Create+Fake+Dataset", time: "30 mins", covers: "Creating relational synthetic data for portfolio projects." }
      ],
      timetable: [
        { time: "15 mins", activity: "Schema Planning: Sketch entity-relationship connections across all 7 tables." },
        { time: "50 mins", activity: "Data Dictionary Authoring: Complete field-level documentation for all 45 database attributes." },
        { time: "25 mins", activity: "Synthetic Data Generation: Create schema DDL script (`schema_ddl.sql`) with table constraints." },
        { time: "30 mins", activity: "Data Validation: Verify foreign key integrity and populate tables with sample rows." },
        { time: "40 mins", activity: "Weekly Assessment 7: Complete cumulative 20-question evaluation covering APIs and Capstone setup." },
        { time: "20 mins", activity: "Review & Git Commit: Push data dictionary and schema script to portfolio GitHub repository." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Write DDL for `fact_transactions` Table",
          problem: "Write the PostgreSQL CREATE TABLE DDL statement for `fact_transactions` including Primary Key, Foreign Keys, CHECK constraints, and appropriate financial data types.",
          scenario: "Database creation phase.",
          instructions: "Include columns: `txn_id`, `mandate_id`, `user_id`, `fund_id`, `gateway_id`, `amount`, `status`, `failure_code`, `created_at`, `settled_at`.",
          expectedOutput: "Valid SQL CREATE TABLE statement with constraints.",
          hint: "Use DECIMAL(12,2) for amount, TIMESTAMP for dates, and CHECK constraint on status.",
          solution: "CREATE TABLE fact_transactions (\n  txn_id VARCHAR(30) PRIMARY KEY,\n  mandate_id VARCHAR(30) REFERENCES fact_mandates(mandate_id),\n  user_id VARCHAR(30) REFERENCES dim_users(user_id),\n  fund_id VARCHAR(30) REFERENCES dim_mutual_funds(fund_id),\n  gateway_id VARCHAR(30) REFERENCES dim_payment_gateways(gateway_id),\n  amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),\n  status VARCHAR(20) NOT NULL CHECK (status IN ('INITIATED', 'CAPTURED', 'FAILED', 'PENDING')),\n  failure_code VARCHAR(50),\n  created_at TIMESTAMP NOT NULL,\n  settled_at TIMESTAMP\n);"
        },
        {
          title: "Guided Exercise 2: Document the Data Dictionary Entry for Mandate Statuses",
          problem: "Write a complete Data Dictionary entry for the `status` column in `fact_mandates`, explaining every permitted state and its business implications.",
          scenario: "Data governance documentation.",
          instructions: "Define the states: PENDING_AUTH, ACTIVE, PAUSED, CANCELLED, EXPIRED.",
          expectedOutput: "A structured documentation table entry.",
          hint: "Explain who triggers each state (customer vs system vs bank).",
          solution: "Column: `fact_mandates.status` | Type: VARCHAR(20) | Nullable: No\nAllowed Values:\n- PENDING_AUTH: Created by user; awaiting bank netbanking/debit card authentication.\n- ACTIVE: Successfully authenticated with NPCI; eligible for scheduled monthly debits.\n- PAUSED: User temporarily paused SIP for up to 3 months (mandate remains registered).\n- CANCELLED: Customer voluntarily terminated SIP; cannot be re-activated.\n- EXPIRED: End date reached or bank rejected recurring mandate mandate."
        },
        {
          title: "Guided Exercise 3: Injecting Gateway Failure Distributions",
          problem: "Write an INSERT statement or mock formula that simulates a 93% success rate, 4% insufficient balance (`INSUFFICIENT_FUNDS`), and 3% bank timeout (`BANK_TIMEOUT`).",
          scenario: "Synthetic dataset generation.",
          instructions: "Use a CASE WHEN or RANDOM() distribution in SQL to generate realistic statuses.",
          expectedOutput: "SQL query using RANDOM() to populate statuses dynamically.",
          hint: "RANDOM() produces a float between 0 and 1.",
          solution: "SELECT txn_id,\n  CASE \n    WHEN RANDOM() < 0.93 THEN 'CAPTURED'\n    WHEN RANDOM() < 0.97 THEN 'FAILED'\n    ELSE 'FAILED'\n  END AS status,\n  CASE \n    WHEN RANDOM() < 0.93 THEN NULL\n    WHEN RANDOM() < 0.97 THEN 'INSUFFICIENT_FUNDS'\n    ELSE 'BANK_TIMEOUT'\n  END AS failure_code\nFROM generate_series(1, 1000) AS txn_id;"
        }
      ],
      assignment: {
        title: "Complete the 7-Table FinTech Data Dictionary & Schema Specification",
        scenario: "You are building the foundational documentation layer of your portfolio project to prove rigorous data architecture skills.",
        deliverable: "1. Create `02_DATA_DICTIONARY.md` documenting all 7 tables: `dim_users`, `dim_kyc`, `dim_mutual_funds`, `dim_payment_gateways`, `fact_mandates`, `fact_transactions`, `fact_retries`.\n2. Detail 45 total columns with types, keys, nullability, and business descriptions.\n3. Include an Entity Relationship Diagram (Mermaid text format).\n4. Save `schema_ddl.sql` with table definitions.",
        completionCriteria: "Complete documentation for all 7 tables and zero syntax errors in DDL script."
      },
      assessment: {
        mcqs: [
          { question: "Why is separating customer profile details into `dim_users` and transaction attempts into `fact_transactions` considered best practice?", options: ["It requires more disk space.", "It adheres to dimensional modeling (Star Schema) principles, separating slowly changing entity dimensions from high-volume operational event facts.", "It prevents users from logging in.", "It is only required in Excel." ], correct: 1, explanation: "Star schema modeling separates descriptive dimensions from high-frequency factual events, maximizing query performance and analytical flexibility." },
          { question: "What is the primary key of `fact_retries` and how does it relate to `fact_transactions`?", options: ["It has no primary key.", "`retry_id` is the primary key, and `original_txn_id` is a Foreign Key referencing `fact_transactions(txn_id)`.", "`user_id` is the primary key.", "It is identical to `fact_transactions`." ], correct: 1, explanation: "Each retry attempt has its own unique retry_id while referencing the parent transaction that originally failed." },
          { question: "Why should monetary transaction columns strictly use DECIMAL/NUMERIC instead of DOUBLE PRECISION in SQL?", options: ["DOUBLE cannot store numbers over 100.", "Floating-point numbers produce imprecise binary approximations that cause balance reconciliation errors.", "DECIMAL is faster.", "DOUBLE only works on text." ], correct: 1, explanation: "Floating-point numbers cause precision loss (e.g. 0.1 + 0.2 = 0.30000000000000004), which is unacceptable in financial accounting." },
          { question: "What does an Entity Relationship Diagram (ERD) visualize?", options: ["The company's employee hierarchy.", "The structural relationships (1:1, 1:N, N:M), primary keys, and foreign keys connecting database tables.", "The color scheme of the dashboard.", "The speed of the network." ], correct: 1, explanation: "An ERD visualizes database entities, attributes, and foreign key relationships, serving as the architectural blueprint." },
          { question: "In our FinTech dataset, why does `fact_mandates` have both a `start_date` and an optional `end_date`?", options: ["Because mutual funds expire every year.", "SIP mandates can be ongoing (until cancelled, where end_date is NULL) or set for a defined tenure (e.g. 36 months).", "To indicate the time of day.", "To store user birthdates." ], correct: 1, explanation: "Many SIPs are 'perpetual' with no predefined end date (stored as NULL), while tenure-based SIPs specify a termination date." }
        ],
        scenarios: [
          { question: "Why is a well-documented Data Dictionary a massive differentiator when a hiring manager reviews your portfolio GitHub repository?", solution: "Most applicants dump messy CSV files with zero documentation into GitHub. Providing a professional Data Dictionary proves that you understand data governance, communicate clearly with cross-functional teams, and write production-ready engineering documentation." },
          { question: "How does having a dedicated `fact_retries` table allow you to perform advanced recovery funnel analysis?", solution: "Instead of overwriting the original failed transaction, storing each retry as a separate event linked to the parent transaction lets us calculate: 1) What percentage of failed payments recover on Retry #1 vs Retry #2; 2) What the optimal retry delay is (12h vs 24h); 3) How much lost GMV was successfully reclaimed." },
          { question: "What would happen if `fact_transactions` omitted the `gateway_id` foreign key column?", solution: "We would lose the ability to compare payment gateway performance. We could not calculate whether Razorpay, Cashfree, or PayU had higher success rates, identify which gateway suffers bank outages, or build automated smart-routing logic." }
        ],
        miniAssignment: "Write the Mermaid ERD code representing the relationships between `dim_users`, `fact_mandates`, `fact_transactions`, and `dim_payment_gateways`."
      }
    },

    // DAY 50
    {
      day: 50, phase: "Portfolio & Interviews", phaseId: 4,
      title: "SQL Analytical Suite: Core Business Queries",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Develop an enterprise SQL analytical script (`01_core_kpi_queries.sql`) calculating primary wealthtech business metrics.",
        "Calculate Monthly Gross Merchandise Value (GMV), Total AUM Inflows, and Average SIP Ticket Size across fund categories.",
        "Compare Payment Gateway reliability and success rates across HDFC, ICICI, SBI, and Axis Bank nodal accounts.",
        "Identify high-net-worth (HNW) investor tiers using SQL window functions (`NTILE`, `DENSE_RANK`)."
      ],
      prerequisites: "SQL Joins, Aggregations, and Window Functions (Phase 2).",
      expectedOutcome: "A production SQL analytical script generating core KPI tables for business leadership.",
      topics: [
        {
          concept: "Multi-Table Financial Aggregations",
          what: "Writing SQL queries that join 3+ tables (`fact_transactions`, `fact_mandates`, `dim_mutual_funds`, `dim_users`) to compute executive financial summaries.",
          why: "Executive stakeholders need consolidated views: Total Volume by Fund House, Category Distribution, and Investor Demographics.",
          how: "SELECT mf.category, COUNT(DISTINCT t.user_id) AS active_investors, SUM(t.amount) AS total_inflow_inr, AVG(t.amount) AS avg_sip_ticket FROM fact_transactions t JOIN dim_mutual_funds mf ON t.fund_id = mf.fund_id WHERE t.status = 'CAPTURED' GROUP BY mf.category ORDER BY total_inflow_inr DESC.",
          example: "Equity Funds driving ₹12.4 Crore with 8,200 active investors, while Debt Funds account for ₹4.1 Crore with higher average ticket sizes (₹8,500 vs ₹2,500).",
          businessCase: "Guiding the asset allocation marketing strategy based on real investor inflows.",
          pitfalls: "Double counting transaction amounts when joining across multiple 1-to-Many relationships without aggregating at the correct granularity."
        },
        {
          concept: "Payment Gateway Performance Benchmarking",
          what: "Comparing payment gateway processing reliability, total GMV processed, captured transactions, and failure percentages.",
          why: "Enables business operations to hold payment gateway vendors accountable to their 99.0% contractual SLAs.",
          how: "SELECT pg.gateway_name, COUNT(*) AS total_attempts, COUNT(CASE WHEN t.status = 'CAPTURED' THEN 1 END) AS successful_txns, ROUND(COUNT(CASE WHEN t.status = 'CAPTURED' THEN 1 END) * 100.0 / COUNT(*), 2) AS success_rate_pct, SUM(CASE WHEN t.status = 'CAPTURED' THEN t.amount ELSE 0 END) AS captured_gmv FROM fact_transactions t JOIN dim_payment_gateways pg ON t.gateway_id = pg.gateway_id GROUP BY pg.gateway_name ORDER BY success_rate_pct DESC.",
          example: "Cashfree delivering 96.4% success rate while Razorpay delivers 93.8%, revealing a 2.6% performance gap representing ₹48 Lakhs in transaction volume.",
          businessCase: "Justifying dynamic smart payment routing to senior leadership.",
          pitfalls: "Calculating average success rate across gateways instead of weighted success rate based on transaction counts."
        },
        {
          concept: "Investor Wealth Segmentation via Window Functions",
          what: "Segmenting customer bases into High Net Worth (HNW), Emerging Wealth, and Retail tiers using SQL analytical window functions (`NTILE(10)`, `PERCENT_RANK()`).",
          why: "FinTech apps prioritize customer support, dedicated wealth managers, and premium features for top-tier investors.",
          how: "WITH user_volume AS (SELECT user_id, SUM(amount) AS total_invested FROM fact_transactions WHERE status = 'CAPTURED' GROUP BY user_id) SELECT user_id, total_invested, NTILE(10) OVER (ORDER BY total_invested DESC) AS wealth_decile, CASE WHEN NTILE(10) OVER (ORDER BY total_invested DESC) = 1 THEN 'Top 10% HNW' WHEN NTILE(10) OVER (ORDER BY total_invested DESC) <= 3 THEN 'Mid-Tier' ELSE 'Retail' END AS investor_tier FROM user_volume.",
          example: "The top 10% of investors account for 62% of total cumulative AUM inflows.",
          businessCase: "Powering CRM marketing campaigns and prioritized customer care routing.",
          pitfalls: "Using `RANK()` instead of `NTILE()` when equal bucket distribution across customer deciles is required."
        }
      ],
      resources: [
        { title: "Advanced SQL Aggregations & FinTech Metrics", platform: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/postgresql-aggregate-functions/", time: "30 mins", covers: "Conditional aggregations, FILTER clauses, and precision math." },
        { title: "SQL Window Functions for Customer Segmentation & Deciles", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Customer+Segmentation", time: "30 mins", covers: "NTILE, DENSE_RANK, and customer cohort grouping." },
        { title: "FinTech Payment Metrics & SLA Monitoring", platform: "Razorpay Engineering Blog", url: "https://razorpay.com/blog/", time: "25 mins", covers: "Gateway success rates, transaction lifecycles, and latency." }
      ],
      timetable: [
        { time: "15 mins", activity: "Query Planning: Review schema ERD and map table join paths." },
        { time: "50 mins", activity: "Core Queries: Write executive GMV, AUM by category, and monthly growth queries." },
        { time: "25 mins", activity: "Gateway Benchmarking: Author payment gateway reliability and SLA comparison queries." },
        { time: "30 mins", activity: "Customer Segmentation: Build HNW decile and tier categorization query using window functions." },
        { time: "40 mins", activity: "Business Assignment: Assemble and annotate `01_core_kpi_queries.sql`." },
        { time: "20 mins", activity: "Assessment & Validation: Solve 5 MCQs and 3 practical SQL challenges." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Category-Wise Monthly Inflows Query",
          problem: "Write a SQL query returning Fund Category, Month (YYYY-MM), Captured Volume (in Lakhs), and Total Unique Investors.",
          scenario: "Monthly executive reporting pack.",
          instructions: "1. Join `fact_transactions` and `dim_mutual_funds`.\n2. Filter for status = 'CAPTURED'.\n3. Truncate transaction date to month.\n4. Format volume in Lakhs (divide by 100,000).",
          expectedOutput: "Aggregated monthly report sorted by Month and Captured Volume.",
          hint: "Use TO_CHAR(created_at, 'YYYY-MM') or DATE_TRUNC('month', created_at).",
          solution: "SELECT \n  TO_CHAR(t.created_at, 'YYYY-MM') AS month_year,\n  mf.category,\n  COUNT(DISTINCT t.user_id) AS unique_investors,\n  ROUND(SUM(t.amount) / 100000.0, 2) AS captured_inflow_lakhs\nFROM fact_transactions t\nJOIN dim_mutual_funds mf ON t.fund_id = mf.fund_id\nWHERE t.status = 'CAPTURED'\nGROUP BY 1, 2\nORDER BY 1 DESC, captured_inflow_lakhs DESC;"
        },
        {
          title: "Guided Exercise 2: Identify High-Volume Drop-Off Funds",
          problem: "Find mutual funds where the transaction failure rate exceeds 8%, listing Fund Name, AMC, Total Attempts, Failed Attempts, and Failure Rate %.",
          scenario: "Mutual fund partner operational audit.",
          instructions: "Use HAVING to filter for failure rate > 8% and minimum 50 attempts.",
          expectedOutput: "Filtered list of troubled mutual fund products.",
          hint: "Failure Rate = COUNT(CASE WHEN status = 'FAILED' THEN 1 END) * 100.0 / COUNT(*).",
          solution: "SELECT \n  mf.fund_name,\n  mf.amc_name,\n  COUNT(*) AS total_attempts,\n  COUNT(CASE WHEN t.status = 'FAILED' THEN 1 END) AS failed_attempts,\n  ROUND(COUNT(CASE WHEN t.status = 'FAILED' THEN 1 END) * 100.0 / COUNT(*), 2) AS failure_rate_pct\nFROM fact_transactions t\nJOIN dim_mutual_funds mf ON t.fund_id = mf.fund_id\nGROUP BY mf.fund_name, mf.amc_name\nHAVING COUNT(*) >= 50 AND (COUNT(CASE WHEN t.status = 'FAILED' THEN 1 END) * 100.0 / COUNT(*)) > 8.0\nORDER BY failure_rate_pct DESC;"
        },
        {
          title: "Guided Exercise 3: Pareto 80/20 Customer Contribution Analysis",
          problem: "Calculate the cumulative percentage of total invested volume generated by investors to verify if the top 20% generate 80% of volume.",
          scenario: "Business Strategy Investor Concentration Analysis.",
          instructions: "Use a CTE with `SUM() OVER (ORDER BY total_invested DESC)`.",
          expectedOutput: "User list with individual volume and running cumulative percentage.",
          hint: "Running sum / Grand total sum * 100.",
          solution: "WITH user_totals AS (\n  SELECT user_id, SUM(amount) AS user_gmv\n  FROM fact_transactions\n  WHERE status = 'CAPTURED'\n  GROUP BY user_id\n),\ngrand_total AS (\n  SELECT SUM(user_gmv) AS total_gmv FROM user_totals\n)\nSELECT \n  u.user_id,\n  u.user_gmv,\n  ROUND(SUM(u.user_gmv) OVER (ORDER BY u.user_gmv DESC) * 100.0 / g.total_gmv, 2) AS cumulative_volume_pct\nFROM user_totals u, grand_total g\nORDER BY u.user_gmv DESC\nLIMIT 20;"
        }
      ],
      assignment: {
        title: "Build Production SQL Script: `01_core_kpi_queries.sql`",
        scenario: "Assemble the foundational SQL analytics file for your GitHub portfolio repository.",
        deliverable: "1. Create file `01_core_kpi_queries.sql` with professional headers, comments, and consistent uppercase SQL keywords.\n2. Query 1: Monthly AUM Inflow & Investor Growth.\n3. Query 2: Mutual Fund House (AMC) Inflow Breakdown.\n4. Query 3: Payment Gateway Performance & SLA Comparison.\n5. Query 4: Top 5% HNW Investor Identification via NTILE.\n6. Save to repository `/sql` directory.",
        completionCriteria: "Complete script with all 4 queries running cleanly with zero syntax errors."
      },
      assessment: {
        mcqs: [
          { question: "Why is `COUNT(DISTINCT user_id)` used instead of `COUNT(user_id)` when calculating monthly active investors?", options: ["COUNT DISTINCT is faster.", "A single user may have multiple SIP transactions in the same month; plain COUNT would count transactions rather than unique individuals.", "COUNT requires text values.", "To ignore NULL values only." ], correct: 1, explanation: "An investor with 3 active SIPs executes 3 transactions, but represents only 1 unique active investor." },
          { question: "What does `ROUND(SUM(amount) / 10000000.0, 2)` accomplish in an Indian financial report?", options: ["Converts Rupee amounts into Crores (1 Crore = 10,000,000).", "Converts Rupee amounts into US Dollars.", "Rounds to the nearest thousand.", "Deletes decimals." ], correct: 0, explanation: "Dividing by 10,000,000 formats large INR sums into Crores, standard for Indian corporate reporting." },
          { question: "What is the difference between `NTILE(4)` and `DENSE_RANK()`?", options: ["There is no difference.", "NTILE(4) divides rows as equally as possible into 4 quartile buckets (1, 2, 3, 4), while DENSE_RANK() assigns sequential ranks based on exact value ties.", "DENSE_RANK only works on dates.", "NTILE requires numbers to be unique." ], correct: 1, explanation: "NTILE creates equal quartile buckets for segmentation; DENSE_RANK assigns continuous rank numbers without skipping ties." },
          { question: "In payment gateway performance reporting, why is calculating GMV important alongside transaction counts?", options: ["Payment gateways don't record transaction counts.", "A high failure rate on small ₹500 transactions has less financial impact than a moderate failure rate on ₹50,000 transactions; GMV captures the actual rupee impact.", "GMV is required by SQL.", "It reduces server load." ], correct: 1, explanation: "Analyzing both volume and count ensures you know both the customer impact (count) and balance sheet impact (GMV)." },
          { question: "Which SQL clause filters records AFTER aggregation has been performed?", options: ["WHERE", "ORDER BY", "HAVING", "LIMIT" ], correct: 2, explanation: "WHERE filters rows before aggregation; HAVING filters groups after aggregate calculations (e.g. SUM, COUNT)." }
        ],
        scenarios: [
          { question: "In an interview, you are asked: 'How do you verify that your SQL queries did not produce duplicate data after joining 4 tables?' What is your process?", solution: "I verify row counts at every step: First, I run a COUNT(*) on the base fact table. After applying the JOINs, I check whether the total row count has multiplied. If the join creates fan-out, I identify which dimension has non-unique keys. Finally, I reconcile the total SUM(amount) against the raw ledger to ensure zero variance." },
          { question: "How would you explain the business finding if Gateway A has a 97% success rate and Gateway B has a 91% success rate?", solution: "I would present this as an operational optimization opportunity: Gateway B is lagging by 6%, which at our current scale represents ₹85 Lakhs in failed monthly transaction attempts. If we implement automated smart routing to favor Gateway A for supported banks, we immediately capture approximately ₹50 Lakhs in retained GMV with zero marketing spend." },
          { question: "Why is modularity (using CTEs and clean formatting) important in portfolio SQL scripts?", solution: "Hiring managers and lead data engineers read portfolio code to judge whether you write maintainable, production-ready code. Clean CTEs, uppercase keywords, and clear comments signal that your work can be immediately deployed in a collaborative engineering environment." }
        ],
        miniAssignment: "Write a SQL query calculating the average number of active SIP mandates per user across the entire customer base."
      }
    },
    // DAY 51
    {
      day: 51, phase: "Portfolio & Interviews", phaseId: 4,
      title: "SQL Deep Dive: Payment Gateway Failures & Cohort Retention",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Analyze payment gateway failure error codes (`INSUFFICIENT_FUNDS`, `BANK_TIMEOUT`, `MANDATE_EXPIRED`, `SYSTEM_ERROR`).",
        "Build an automated Retry Funnel Conversion query tracking secondary debit success rates.",
        "Calculate investor monthly cohort retention rates (Month 0 through Month 6) using SQL CTEs.",
        "Author `02_failure_and_retention_deepdive.sql` with root-cause insights for product and engineering teams."
      ],
      prerequisites: "CTEs, Window Functions, and Date arithmetic (Phase 2).",
      expectedOutcome: "Advanced diagnostic SQL queries identifying operational failure root causes and multi-month customer retention curves.",
      topics: [
        {
          concept: "Payment Failure Categorization & Business Attribution",
          what: "Categorizing raw gateway error codes into actionable operational buckets: Customer-side (Insufficient Funds), Bank-side (Core Banking Downtime / Timeout), and Platform-side (Expired Token / API Mismatch).",
          why: "Engineering cannot fix customer insufficient funds, but they CAN retry bank timeouts and fix API format bugs; proper classification directs engineering resources effectively.",
          how: "SELECT CASE WHEN failure_code IN ('INSUFFICIENT_FUNDS', 'ACCOUNT_FROZEN') THEN 'Customer Balance Issue' WHEN failure_code IN ('BANK_TIMEOUT', 'GATEWAY_504', 'NODAL_DOWN') THEN 'Bank / Gateway Outage' WHEN failure_code IN ('MANDATE_EXPIRED', 'LIMIT_EXCEEDED') THEN 'Mandate Configuration' ELSE 'Unclassified' END AS failure_category, COUNT(*) AS failure_count, SUM(amount) AS lost_volume_inr FROM fact_transactions WHERE status = 'FAILED' GROUP BY 1 ORDER BY lost_volume_inr DESC.",
          example: "Bank Outages accounting for ₹32 Lakhs in failed volume that could be recovered via an automated 12-hour retry schedule.",
          businessCase: "Quantifying the exact ROI for engineering to build an automated payment retry engine.",
          pitfalls: "Treating all failed transactions as lost forever without checking if they can be recovered."
        },
        {
          concept: "Automated Payment Retry Funnel Analytics",
          what: "Tracking failed transactions through their subsequent retry attempts to measure the recovery conversion rate.",
          why: "Reveals how much lost revenue the retry logic salvages and identifies the optimal time window between retries.",
          how: "SELECT r.retry_attempt_number, COUNT(*) AS retries_triggered, COUNT(CASE WHEN r.status = 'CAPTURED' THEN 1 END) AS successful_retries, ROUND(COUNT(CASE WHEN r.status = 'CAPTURED' THEN 1 END) * 100.0 / COUNT(*), 2) AS recovery_rate_pct, SUM(CASE WHEN r.status = 'CAPTURED' THEN r.amount ELSE 0 END) AS recovered_inr FROM fact_retries r GROUP BY r.retry_attempt_number ORDER BY r.retry_attempt_number.",
          example: "Retry #1 (triggered after 24h) recovers 44.2% of failed transactions; Retry #2 (after 72h) recovers an additional 12.1%.",
          businessCase: "Proves to leadership that automated retries salvaged ₹42 Lakhs in GMV in Q3.",
          pitfalls: "Retrying customers with 'INSUFFICIENT_FUNDS' immediately within 5 minutes, which annoys users and yields < 1% recovery."
        },
        {
          concept: "Monthly Investor Cohort Retention Curves in SQL",
          what: "Tracking groups of users who signed up in the same month (cohorts) to see what percentage continue executing active SIP debits in Month 1, Month 2, Month 3, and beyond.",
          why: "The gold standard metric for Product Analysts evaluating product stickiness, customer churn, and long-term business viability.",
          how: "Use CTEs to: 1) Identify user cohort month (first transaction month); 2) Map subsequent transaction activity months; 3) Compute month-lag index; 4) Pivot into a retention matrix.",
          example: "January 2026 cohort starts with 1,200 investors; by Month 3 (April), 86% remain active; by Month 6, 78% remain active.",
          businessCase: "Identifying that churn accelerates after Month 3, prompting a proactive push-notification re-engagement sprint.",
          pitfalls: "Including users with paused SIPs as permanently churned customers without separating pause states."
        }
      ],
      resources: [
        { title: "Building Cohort Retention Matrices in SQL: Complete Guide", platform: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/sql-retention/", time: "35 mins", covers: "Cohort grouping, date math, and retention heatmaps." },
        { title: "FinTech Payment Failure Analysis & Smart Retries", platform: "Stripe Engineering & Tech Talks", url: "https://stripe.com/blog", time: "25 mins", covers: "Machine learning retry schedules and decline code taxonomy." },
        { title: "Alex The Analyst: Customer Retention & Churn Analysis", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Customer+Retention+SQL", time: "30 mins", covers: "Step-by-step SQL queries for customer cohorts." }
      ],
      timetable: [
        { time: "15 mins", activity: "Error Taxonomy: Categorize bank vs customer decline codes." },
        { time: "50 mins", activity: "Failure Analysis Query: Write query classifying errors and lost GMV impact." },
        { time: "25 mins", activity: "Retry Funnel Query: Author multi-stage recovery conversion script." },
        { time: "30 mins", activity: "Cohort Retention Script: Build multi-month customer retention matrix query." },
        { time: "40 mins", activity: "Business Assignment: Finalize and document `02_failure_and_retention_deepdive.sql`." },
        { time: "20 mins", activity: "Assessment & Knowledge Check: Solve 5 MCQs and 3 scenario queries." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Hourly Failure Spike Detection",
          problem: "Write a SQL query finding transaction count and failure rate grouped by hour of the day (0 to 23), identifying operational downtime windows.",
          scenario: "Operations team bank maintenance investigation.",
          instructions: "1. Extract EXTRACT(HOUR FROM created_at).\n2. Calculate total attempts and failure rate %.\n3. Order by hour.",
          expectedOutput: "24 rows showing hourly volume and failure percentages.",
          hint: "Use EXTRACT(HOUR FROM created_at).",
          solution: "SELECT \n  EXTRACT(HOUR FROM created_at) AS hour_of_day,\n  COUNT(*) AS total_transactions,\n  COUNT(CASE WHEN status = 'FAILED' THEN 1 END) AS failed_transactions,\n  ROUND(COUNT(CASE WHEN status = 'FAILED' THEN 1 END) * 100.0 / COUNT(*), 2) AS failure_rate_pct\nFROM fact_transactions\nGROUP BY 1\nORDER BY 1;"
        },
        {
          title: "Guided Exercise 2: Nodal Bank Outage Correlation",
          problem: "Find which nodal partner bank suffers the highest timeout failure rate during month-end SIP processing dates (28th through 5th).",
          scenario: "Banking alliances contract review.",
          instructions: "Join `fact_transactions` with `dim_users` (or bank code table) and filter for `failure_code = 'BANK_TIMEOUT'`.",
          expectedOutput: "Ranked list of banks with failure volumes and rates.",
          hint: "Filter for EXTRACT(DAY FROM created_at) IN (1,2,3,4,5,28,29,30,31).",
          solution: "SELECT \n  u.bank_name,\n  COUNT(*) AS total_attempts,\n  COUNT(CASE WHEN t.failure_code = 'BANK_TIMEOUT' THEN 1 END) AS timeout_count,\n  ROUND(COUNT(CASE WHEN t.failure_code = 'BANK_TIMEOUT' THEN 1 END) * 100.0 / COUNT(*), 2) AS timeout_rate_pct\nFROM fact_transactions t\nJOIN dim_users u ON t.user_id = u.user_id\nWHERE EXTRACT(DAY FROM t.created_at) IN (1,2,3,4,5,28,29,30,31)\nGROUP BY u.bank_name\nHAVING COUNT(*) >= 50\nORDER BY timeout_rate_pct DESC;"
        },
        {
          title: "Guided Exercise 3: Cohort Month-1 Retention Query",
          problem: "Write a CTE query calculating what percentage of users who made their first transaction in January 2026 transacted again in February 2026.",
          scenario: "Product retention check.",
          instructions: "1. CTE 1: Find user min created_at (cohort month).\n2. CTE 2: Find distinct active user months.\n3. Compute retention ratio.",
          expectedOutput: "Single row showing cohort size, retained count, and retention percentage.",
          hint: "Filter cohort month = '2026-01' and activity month = '2026-02'.",
          solution: "WITH user_first_month AS (\n  SELECT user_id, TO_CHAR(MIN(created_at), 'YYYY-MM') AS cohort_month\n  FROM fact_transactions\n  WHERE status = 'CAPTURED'\n  GROUP BY user_id\n),\nactive_feb AS (\n  SELECT DISTINCT user_id\n  FROM fact_transactions\n  WHERE status = 'CAPTURED' AND TO_CHAR(created_at, 'YYYY-MM') = '2026-02'\n)\nSELECT \n  COUNT(f.user_id) AS jan_cohort_size,\n  COUNT(a.user_id) AS active_in_feb,\n  ROUND(COUNT(a.user_id) * 100.0 / COUNT(f.user_id), 2) AS month_1_retention_pct\nFROM user_first_month f\nLEFT JOIN active_feb a ON f.user_id = a.user_id\nWHERE f.cohort_month = '2026-01';"
        }
      ],
      assignment: {
        title: "Publish `02_failure_and_retention_deepdive.sql` with Executive Commentary",
        scenario: "Assemble the deep-dive diagnostic SQL file for your portfolio repository.",
        deliverable: "1. Create file `02_failure_and_retention_deepdive.sql`.\n2. Query 1: Failure Code Taxonomy & Lost Volume (INR).\n3. Query 2: Bank-Wise Timeout Outage Rankings.\n4. Query 3: Multi-Stage Retry Funnel Conversion.\n5. Query 4: 6-Month User Cohort Retention Matrix.\n6. Add markdown commentary explaining key insights for product management.",
        completionCriteria: "Script runs error-free and generates executive commentary highlighting the ₹42 Lakhs retry opportunity."
      },
      assessment: {
        mcqs: [
          { question: "Why should bank network timeouts (`BANK_TIMEOUT`) be retried automatically while `MANDATE_CANCELLED` should not?", options: ["Timeouts are transient infrastructure glitches that often succeed upon retry; mandate cancellation is a permanent legal status that will always fail.", "Bank timeouts cost money to retry.", "Mandate cancelled errors fix themselves.", "All errors should be retried 10 times." ], correct: 0, explanation: "Retrying permanent terminal errors wastes gateway fees and frustrates customers; retrying transient bank network glitches salvages lost GMV." },
          { question: "In a cohort retention analysis, what does Month 0 represent?", options: ["The month before the user signed up.", "The user's initial acquisition/first-transaction month, which serves as the 100% baseline.", "Zero transactions occurred.", "The month the user churned." ], correct: 1, explanation: "Month 0 is the starting baseline of the cohort, representing 100% of the active users acquired during that period." },
          { question: "What is the primary cause of automated SIP payment failure spikes on the 1st and 5th days of the month?", options: ["Computer viruses.", "High network congestion across core banking servers (CBS) as thousands of enterprises process payroll and recurring debits simultaneously.", "Mutual fund holidays.", "Credit card expirations." ], correct: 1, explanation: "Salary cycles and mass recurring billing cause peak load on bank payment switches on the 1st and 5th of every month." },
          { question: "What does a 40% retry recovery rate indicate to a Product Manager?", options: ["That 60% of all users left the platform.", "That four out of ten initially failed transactions were successfully recovered by the automated retry engine, reclaiming revenue without customer effort.", "That the system is broken.", "That users need to pay 40% more." ], correct: 1, explanation: "A 40% recovery rate proves that the automated retry engine successfully reclaimed 40% of transactions that would have otherwise been lost." },
          { question: "In PostgreSQL, which function extracts the day of the month as an integer from a timestamp?", options: ["DAYOFMONTH()", "EXTRACT(DAY FROM timestamp_col)", "DATE_DAY()", "TO_DAY()" ], correct: 1, explanation: "EXTRACT(DAY FROM timestamp) is standard SQL syntax in PostgreSQL to extract the numeric day of the month (1-31)." }
        ],
        scenarios: [
          { question: "A product manager asks: 'Why did our cohort retention drop by 12% between Month 2 and Month 3?' How do you use SQL to investigate?", solution: "I would run a behavioral segmentation query comparing retained vs churned users: 1) Did churned users experience payment gateway failures in Month 2? 2) Did their mutual fund returns drop? 3) Did they switch bank accounts? Often, technical payment failures cause involuntary churn that looks like user disinterest." },
          { question: "How does showing cohort retention analysis in your portfolio position you for Product Analyst roles?", solution: "Product Analyst interviews focus heavily on user engagement, stickiness, and lifetime value. Demonstrating that you can write complex cohort retention queries proves you think about user journeys, product economics, and retention mechanics, not just descriptive reporting." },
          { question: "If the data reveals that retrying failed debits at 10:00 AM on Saturday yields an 8% recovery while 02:00 PM on Friday yields a 38% recovery, what recommendation do you make?", solution: "I recommend configuring the automated retry engine with smart temporal routing: avoid retrying on weekend mornings when banking batches are throttled, and schedule retries during weekday afternoon banking windows when accounts are funded and settlement switches operate at peak capacity." }
        ],
        miniAssignment: "Write a SQL snippet that calculates the percentage of total monthly failures attributed to each failure code."
      }
    },

    // DAY 52
    {
      day: 52, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Financial Validation & Reconciliation Model in Excel",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Export SQL analytical query results into an enterprise Excel financial reconciliation workbook (`FinTech_SIP_Reconciliation_Model.xlsx`).",
        "Build a two-way reconciliation engine comparing Payment Gateway settlement logs against Internal Database transaction ledgers.",
        "Implement automated variance detection, conditional formatting alert flags, and exception reporting summaries.",
        "Create an executive financial bridge explaining reconciled volume, pending settlements, gateway fee deductions, and net settled cash."
      ],
      prerequisites: "Phase 1 (Excel Modeling, Lookups, SUMIFS) and Phase 2 (SQL Query Outputs).",
      expectedOutcome: "A production financial reconciliation workbook with dynamic variance alerts, executive KPI cards, and audit trails.",
      topics: [
        {
          concept: "Financial Reconciliation Mechanics in FinTech",
          what: "The accounting and operational process of verifying that internal transaction records match third-party payment gateway settlement reports rupee-for-rupee.",
          why: "Discrepancies lead to regulatory penalties from RBI/SEBI, customer mistrust, or uncollected operational fees; reconciliation is a mission-critical BA capability.",
          how: "Compare records by unique `txn_id` or `utr_number`: Internal Captured Amount vs Gateway Settled Amount; Flag variances: `Variance = Internal_Amt - Gateway_Amt`.",
          example: "Internal DB records 10,000 captured transactions totalling ₹2,45,00,000; Gateway settled ₹2,44,12,000; Reconciliation identifies ₹88,000 in un-settled T+1 batch transactions.",
          businessCase: "Preventing revenue leakage and ensuring clean monthly financial book closing.",
          pitfalls: "Matching records by customer name or date alone instead of unique transaction identifiers (UTR / Gateway Reference ID)."
        },
        {
          concept: "Automated Variance Detection & Exception Categorization",
          what: "Using Excel formulas (`XLOOKUP`, `IF`, `ABS`, `ROUND`) to automatically categorize discrepancies into predefined exception buckets.",
          why: "Operations teams cannot manually review 50,000 rows; automated flags highlight only the exceptions that require manual intervention.",
          how: "Formula: `=IF(ISNA(Gateway_Ref), \"Missing in Gateway\", IF(ROUND(ABS(DB_Amt - GW_Amt), 2) > 0.01, \"Amount Mismatch\", IF(GW_Status <> DB_Status, \"Status Discrepancy\", \"MATCHED\")))`.",
          example: "A transaction marked 'CAPTURED' in internal DB but 'REFUNDED' in Razorpay report is instantly flagged as 'Status Discrepancy'.",
          businessCase: "Cutting daily reconciliation time from 3 hours to 10 minutes for operations teams.",
          pitfalls: "Ignoring penny variances caused by unrounded floating-point calculations."
        },
        {
          concept: "Executive Financial Bridge & Summary Dashboard",
          what: "A high-level reconciliation waterfall sheet summarizing: Gross Initiated GMV -> Failed Transactions -> Net Captured Volume -> MDR Fees Deducted -> Net Settlement Inflow.",
          why: "Gives CFOs and Finance Controllers a clear, audit-compliant overview of cash flows.",
          how: "Use dynamic structured table references: `=SUM(tbl_DB[Amount])`, `=SUMIFS(tbl_DB[Amount], tbl_DB[Status], \"FAILED\")`, with clean card styling and waterfall chart.",
          example: "Waterfall showing: ₹3.0 Cr Initiated - ₹18 Lakhs Failed = ₹2.82 Cr Captured - ₹2.82 Lakhs Gateway MDR (1%) = ₹2.7918 Cr Settled into Nodal Bank.",
          businessCase: "Core deliverable presented in executive leadership financial reviews.",
          pitfalls: "Hardcoding numbers into summary cells instead of linking dynamically to raw transaction tabs."
        }
      ],
      resources: [
        { title: "Financial Reconciliation Techniques in Excel", platform: "Corporate Finance Institute", url: "https://corporatefinanceinstitute.com/resources/accounting/bank-reconciliation/", time: "30 mins", covers: "Reconciliation models, variance checks, and audit standards." },
        { title: "Building Automated Reconciliation Workbooks", platform: "Leila Gharani", url: "https://www.youtube.com/results?search_query=Leila+Gharani+Excel+Reconciliation", time: "30 mins", covers: "XLOOKUP matching, conditional alerts, and exception handling." },
        { title: "MDR Fees, Settlement Cycles (T+1), and Nodal Accounts", platform: "Razorpay Documentation", url: "https://razorpay.com/docs/payments/settlements/", time: "25 mins", covers: "Understanding merchant discount rates and settlement schedules." }
      ],
      timetable: [
        { time: "15 mins", activity: "Workbook Architecture: Structure 3 tabs (`Summary`, `Internal_DB`, `Gateway_Settlement`)." },
        { time: "50 mins", activity: "Data Staging & Lookups: Populate mock datasets and write two-way XLOOKUP matching formulas." },
        { time: "25 mins", activity: "Variance Engine: Author exception classification logic and conditional formatting alert rules." },
        { time: "30 mins", activity: "Executive Bridge: Build dynamic financial waterfall summary and KPI metric cards." },
        { time: "40 mins", activity: "Business Assignment: Complete `FinTech_SIP_Reconciliation_Model.xlsx` workbook." },
        { time: "20 mins", activity: "Review & Quality Check: Verify zero formula errors (#REF, #VALUE) and complete assessment." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Two-Way XLOOKUP Matching Formula",
          problem: "Write the XLOOKUP formula in `Internal_DB` column G to pull the `Settled_Amount` from `tbl_Gateway` using `Txn_ID`, returning 0 if not found.",
          scenario: "Reconciliation table construction.",
          instructions: "Use structured table references and the 4th argument of XLOOKUP for missing values.",
          expectedOutput: "Clean formula returning settled amount or 0.",
          hint: "`=XLOOKUP([@[Txn_ID]], tbl_Gateway[Txn_ID], tbl_Gateway[Settled_Amount], 0)`.",
          solution: "=XLOOKUP([@[Txn_ID]], tbl_Gateway[Txn_ID], tbl_Gateway[Settled_Amount], 0)"
        },
        {
          title: "Guided Exercise 2: Automated Exception Classifier",
          problem: "Write a nested IF formula in column H that returns: 'MATCHED', 'AMOUNT_MISMATCH', 'STATUS_MISMATCH', or 'MISSING_IN_GATEWAY'.",
          scenario: "Audit exception tagging.",
          instructions: "1. Check if Gateway reference is missing.\n2. Check if ABS(DB_Amount - GW_Amount) > 0.01.\n3. Check if DB_Status <> GW_Status.\n4. Else return 'MATCHED'.",
          expectedOutput: "Accurate text exception tag.",
          hint: "Evaluate missing condition first to prevent cascading errors.",
          solution: "=IF([@[GW_Status]]=\"NOT_FOUND\", \"MISSING_IN_GATEWAY\", IF(ROUND(ABS([@[Amount]]-[@[Settled_Amount]]), 2) > 0.01, \"AMOUNT_MISMATCH\", IF([@[Status]]<>[@[GW_Status]], \"STATUS_MISMATCH\", \"MATCHED\")))"
        },
        {
          title: "Guided Exercise 3: Conditional Formatting Soft Red Highlight",
          problem: "Specify the exact conditional formatting rule formula to highlight rows where `Exception_Status <> \"MATCHED\"` with a soft amber/red fill.",
          scenario: "Visual exception alerting.",
          instructions: "1. Select table range A2:H500.\n2. New Rule > Use formula.\n3. Lock column reference `$H2 <> \"MATCHED\"`.\n4. Apply dark amber text and soft background.",
          expectedOutput: "Working conditional formatting formula.",
          hint: "Ensure the dollar sign locks the column ($H2) so the entire row highlights.",
          solution: "Formula: =$H2<>\"MATCHED\"\nApplies to: =$A$2:$H$500\nFormat: Fill #3d1a24 (dark red), Font #fca5a5 (soft red)."
        }
      ],
      assignment: {
        title: "Complete `FinTech_SIP_Reconciliation_Model.xlsx` with Executive Summary",
        scenario: "You are preparing the financial validation artifact of your portfolio capstone.",
        deliverable: "1. Create multi-tab Excel workbook: Tab 1: `Executive_Summary` with KPI cards and waterfall bridge; Tab 2: `Internal_DB` (1,000 transactions); Tab 3: `Gateway_Report` (1,000 records); Tab 4: `Audit_Exceptions`.\n2. Include 0 broken formulas, professional dark/light palette, and documented variance findings.\n3. Export PDF executive summary sheet.\n4. Save workbook in `/excel` portfolio directory.",
        completionCriteria: "Complete workbook with dynamic reconciliation logic, zero hardcoded values in summary, and verified variance balance."
      },
      assessment: {
        mcqs: [
          { question: "What is a 'T+1' settlement cycle in payment processing?", options: ["Transactions settle after 1 minute.", "Funds captured today are settled into the merchant's nodal bank account on the next business day (T+1).", "Only 1 transaction is processed per day.", "Transactions are cancelled after 1 day." ], correct: 1, explanation: "T+1 means transaction settlement occurs on the next working day following transaction capture." },
          { question: "Why must cell comparisons for monetary values use `ROUND(ABS(A1 - B1), 2) > 0.01` rather than `A1 <> B1`?", options: ["Direct equality comparison often fails due to microscopic IEEE floating-point precision artifacts (e.g. 0.00000000001 difference).", "Excel cannot compare currency.", "ROUND makes formulas faster.", "ABS converts text to numbers." ], correct: 0, explanation: "Floating-point representation in computers can create tiny decimal artifacts; a delta tolerance check avoids false mismatch alerts." },
          { question: "What is MDR in payment gateway operations?", options: ["Master Data Record.", "Merchant Discount Rate: the percentage fee deducted by the gateway/rail provider for processing the transaction.", "Minimum Daily Revenue.", "Mutual Deposit Ratio." ], correct: 1, explanation: "MDR (Merchant Discount Rate) is the fee charged by payment processors (typically 0.5% to 2.0%) on transaction volume." },
          { question: "In an Excel reconciliation model, what is the primary risk of using standard cell references (e.g. A2:A100) instead of structured Table references (`tbl_DB[Amount]`)?", options: ["Structured tables crash Excel.", "Standard ranges do not automatically expand when new transaction rows are added, leading to incomplete calculations.", "Standard ranges are encrypted.", "There is no difference." ], correct: 1, explanation: "Excel Tables dynamically expand their ranges when new records are appended, ensuring formulas never miss new transactions." },
          { question: "What does an 'Unreconciled Variance' of ₹0.00 indicate on an executive audit report?", options: ["The company earned zero revenue.", "Every captured transaction was successfully accounted for across internal databases and external banking settlement ledgers with zero balance leakage.", "The report failed to calculate.", "All transactions failed." ], correct: 1, explanation: "Zero variance is the gold standard in reconciliation, proving complete mathematical agreement between internal and external ledgers." }
        ],
        scenarios: [
          { question: "In an interview, you are asked: 'Why did you build both a SQL analytics script AND an Excel reconciliation model for your portfolio project?' How do you answer?", solution: "SQL and Excel serve complementary enterprise roles. SQL efficiently queries and aggregates massive millions-row transactional databases. But Finance, Audit, and Operations teams rely on Excel for line-item reconciliation, variance modeling, and audit sign-offs. Demonstrating fluency in both proves that I can extract data at scale and translate it into audit-compliant financial tools for business stakeholders." },
          { question: "How would you explain a scenario where the internal database marks a transaction as 'FAILED' but the payment gateway settlement report shows 'CAPTURED'?", solution: "This is a classic payment callback timeout failure: the customer's bank approved the debit and the gateway captured the money, but a network interruption prevented the gateway's webhook from reaching our internal server before our system timed out. The reconciliation model catches this discrepancy, triggering an automated status sync and crediting the user's mutual fund units without requiring a customer support ticket." },
          { question: "What makes your reconciliation model 'executive-ready' rather than just a raw spreadsheet?", solution: "It includes an Executive Summary tab featuring high-level KPI cards (Total GMV, Settled Cash, Net Variances), an audit waterfall bridge explaining fee deductions, and a filtered Exception View with conditional formatting alerts so leaders can review the health of ₹18 Crore in volume in under 60 seconds." }
        ],
        miniAssignment: "Write the formula to calculate the Net Settlement Amount given Gross Volume in cell B5 and MDR fee rate (1.75%) in cell B6."
      }
    },

    // DAY 53
    {
      day: 53, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Power BI Data Model & Advanced DAX Suite for FinTech",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Architect a production-grade Star Schema in Power BI linking Fact and Dimension tables via 1-to-Many single-directional relationships.",
        "Establish an isolated `_Measures` table housing organized DAX calculation folders.",
        "Develop core executive DAX measures: `[Total AUM Inflow]`, `[Monthly GMV]`, `[Gateway Success Rate %]`, `[Active SIP Count]`, and `[Churn Rate %]`.",
        "Implement Time Intelligence DAX measures: `[MoM Volume Growth %]`, `[YTD GMV]`, and `[AUM 3-Month Moving Average]`."
      ],
      prerequisites: "Phase 3 (Power BI, Power Query, Star Schema, and DAX fundamentals).",
      expectedOutcome: "A fully modeled Power BI `.pbix` file with star schema relationships, dedicated measures table, and advanced DAX formulas.",
      topics: [
        {
          concept: "FinTech Star Schema & Relationship Integrity",
          what: "Organizing the Power BI data model into central fact tables (`Fact_Transactions`, `Fact_Retries`) surrounded by clean dimension tables (`Dim_Date`, `Dim_Users`, `Dim_Funds`, `Dim_Gateways`).",
          why: "A clean star schema prevents ambiguous relationship paths, optimizes VertiPaq engine compression, and ensures DAX measures compute correctly.",
          how: "Configure all relationships as 1-to-Many (`1:*`) with Single cross-filter direction pointing from Dimension to Fact table. Hide foreign key columns in Fact table to force users to filter via Dimensions.",
          example: "`Dim_Funds[Fund_ID]` (1) connected to `Fact_Transactions[Fund_ID]` (*); filtering by `Dim_Funds[Category]` seamlessly slices transaction metrics.",
          businessCase: "Ensuring 100% accurate aggregations across 500,000+ transaction rows in enterprise reporting.",
          pitfalls: "Using bidirectional cross-filtering indiscriminately, which introduces circular relationship ambiguity and severely degrades visual rendering performance."
        },
        {
          concept: "Dedicated `_Measures` Table Architecture",
          what: "Creating an empty table (`_Measures`) solely to organize DAX measures into display folders (`01_Core_Financials`, `02_Operational_Health`, `03_Time_Intelligence`, `04_Retention_Metrics`).",
          why: "Keeps models professional and maintainable; prevents measures from being scattered across random fact tables.",
          how: "Modeling tab > New Table `_Measures = { BLANK() }`. Move measures into it, set Display Folders in Properties pane, and hide the dummy column.",
          example: "`_Measures` pinned to the very top of the Fields pane with an icon for immediate navigation.",
          businessCase: "Industry standard practice across enterprise Power BI centers of excellence.",
          pitfalls: "Leaving default implicit measures (automatic sums) active on fact table columns."
        },
        {
          concept: "Advanced Time Intelligence & Growth DAX",
          what: "Authoring DAX measures comparing current month performance against previous periods and running year-to-date totals.",
          why: "Executives don't just ask 'what was volume this month?'; they ask 'how did we grow compared to last month and last year?'",
          how: "Use `CALCULATE`, `DATEADD`, `TOTALYTD`, and `DIVIDE` with strict error handling.",
          example: "`GMV MoM Growth % = VAR _Current = [Total Captured GMV] VAR _Prior = CALCULATE([Total Captured GMV], DATEADD('Dim_Date'[Date], -1, MONTH)) RETURN DIVIDE(_Current - _Prior, _Prior, 0)`.",
          businessCase: "Tracking whether SIP volume growth is accelerating or decelerating month-over-month.",
          pitfalls: "Using time intelligence functions without a properly marked, contiguous `Dim_Date` table."
        }
      ],
      resources: [
        { title: "The Definitive Guide to DAX & Dimensional Modeling", platform: "SQLBI (Marco Russo & Alberto Ferrari)", url: "https://www.sqlbi.com/articles/star-schema-in-power-bi/", time: "35 mins", covers: "Star schemas, relationship cardinality, and filter context." },
        { title: "Building an Enterprise Measures Table & Folders in Power BI", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Measures+Table+Power+BI", time: "25 mins", covers: "Model organization, folder structures, and DAX best practices." },
        { title: "Mastering Time Intelligence DAX (MoM, YoY, YTD)", platform: "Curibal (Avi Singh)", url: "https://www.youtube.com/results?search_query=Curibal+Power+BI+Time+Intelligence+DAX", time: "30 mins", covers: "CALCULATE, DATEADD, and safe division." }
      ],
      timetable: [
        { time: "15 mins", activity: "Schema Review: Verify relationships in Power BI Model view." },
        { time: "50 mins", activity: "Date Table & Dimensions: Generate contiguous Dim_Date table using DAX CALENDARAUTO()." },
        { time: "25 mins", activity: "Core DAX Authoring: Build base measures ([Total Volume], [Captured GMV], [Success Rate %])." },
        { time: "30 mins", activity: "Time Intelligence: Author MoM Growth, YoY Change, and 3-Month Moving Average measures." },
        { time: "40 mins", activity: "Business Assignment: Document complete DAX measure dictionary in `03_DAX_MEASURES.md`." },
        { time: "20 mins", activity: "Validation & Assessment: Solve 5 MCQs and 3 DAX troubleshooting challenges." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Gateway SLA Compliance % DAX Measure",
          problem: "Write a DAX measure `[Gateway SLA Compliance %]` that calculates the percentage of payment gateways meeting the >= 95.0% success rate threshold.",
          scenario: "Operations SLA monitoring.",
          instructions: "Use `COUNTROWS`, `FILTER`, and `DIVIDE` over `Dim_Gateways`.",
          expectedOutput: "A robust DAX measure returning compliance percentage.",
          hint: "Evaluate success rate per gateway inside FILTER.",
          solution: "[Gateway SLA Compliance %] = \nVAR _CompliantCount = \n    COUNTROWS(\n        FILTER(\n            VALUES('Dim_Payment_Gateways'[gateway_name]),\n            [Gateway Success Rate %] >= 0.95\n        )\n    )\nVAR _TotalGateways = COUNTROWS(VALUES('Dim_Payment_Gateways'[gateway_name]))\nRETURN\nDIVIDE(_CompliantCount, _TotalGateways, 0)"
        },
        {
          title: "Guided Exercise 2: Active SIP Churn Rate % DAX Measure",
          problem: "Write a DAX measure calculating monthly SIP Mandate Churn Rate %: Mandates Cancelled this month divided by Active Mandates at the start of the month.",
          scenario: "Executive churn tracking.",
          instructions: "Use `CALCULATE` and date filters.",
          expectedOutput: "DAX formula with safe zero division.",
          hint: "Cancelled in month / Active at start.",
          solution: "[SIP Churn Rate %] = \nVAR _Cancelled = \n    CALCULATE(\n        COUNTROWS('Fact_Mandates'),\n        USERELATIONSHIP('Fact_Mandates'[cancelled_date], 'Dim_Date'[Date]),\n        'Fact_Mandates'[status] = \"CANCELLED\"\n    )\nVAR _ActiveStart = \n    CALCULATE(\n        COUNTROWS('Fact_Mandates'),\n        'Fact_Mandates'[status] = \"ACTIVE\",\n        'Dim_Date'[Date] = MIN('Dim_Date'[Date])\n    )\nRETURN\nDIVIDE(_Cancelled, _ActiveStart, 0)"
        },
        {
          title: "Guided Exercise 3: 3-Month Moving Average DAX Measure",
          problem: "Write a DAX measure `[GMV 3M Moving Avg]` that calculates the rolling 3-month average of `[Total Captured GMV]`.",
          scenario: "Trend smoothing for executive review.",
          instructions: "Use `DATESINPERIOD` over `Dim_Date[Date]`.",
          expectedOutput: "Working rolling average DAX formula.",
          hint: "DATESINPERIOD(Dim_Date[Date], MAX(Dim_Date[Date]), -3, MONTH).",
          solution: "[GMV 3M Moving Avg] = \nCALCULATE(\n    AVERAGEX(\n        VALUES('Dim_Date'[Month_Year]),\n        [Total Captured GMV]\n    ),\n    DATESINPERIOD(\n        'Dim_Date'[Date],\n        MAX('Dim_Date'[Date]),\n        -3,\n        MONTH\n    )\n)"
        }
      ],
      assignment: {
        title: "Publish Complete DAX Measures Dictionary: `03_DAX_MEASURES.md`",
        scenario: "Document the complete mathematical logic of your Power BI analytics suite for portfolio review.",
        deliverable: "1. Create markdown file `03_DAX_MEASURES.md`.\n2. Document 15 production DAX measures across 4 folders: Core Financials (4), Operational Health (4), Time Intelligence (4), and Customer/Retention (3).\n3. For each measure, provide: Name, DAX Code, Business Purpose, and Return Format (Currency, %, Whole Number).\n4. Save to portfolio `/powerbi` directory.",
        completionCriteria: "Complete documentation for all 15 measures with formatted DAX code and zero syntax bugs."
      },
      assessment: {
        mcqs: [
          { question: "Why is DIVIDE(Numerator, Denominator, 0) strictly preferred over the slash operator (/) in DAX?", options: ["DIVIDE is faster to write.", "The slash operator returns a visible #DIV/0! error on divide-by-zero, breaking dashboard visuals, whereas DIVIDE handles zero denominators safely.", "DIVIDE converts numbers to percentages automatically.", "The slash operator is deprecated in Power BI." ], correct: 1, explanation: "DIVIDE provides built-in division-by-zero safety, returning an alternate value (like 0 or BLANK) without crashing visuals." },
          { question: "What is the primary function of the VertiPaq engine in Power BI?", options: ["To format charts.", "A columnar in-memory database engine that compresses, stores, and executes analytical queries at high speed.", "To manage user logins.", "To connect to email." ], correct: 1, explanation: "VertiPaq is Power BI's columnar in-memory analytical engine, delivering remarkable compression and lightning-fast aggregations." },
          { question: "In DAX, what does the CALCULATE function do?", options: ["Performs simple addition.", "Evaluates an expression in a modified filter context, overriding, removing, or adding filters.", "Sorts a table alphabetically.", "Refreshes the data source." ], correct: 1, explanation: "CALCULATE is the single most powerful function in DAX, enabling explicit modification of the incoming filter context." },
          { question: "Why should `Dim_Date` always be marked as an official Date Table in Power BI?", options: ["It adds a calendar icon in the model.", "It disables automatic behind-the-scenes date hierarchies, reduces file size, and ensures DAX Time Intelligence functions calculate accurately.", "It translates months into multiple languages.", "It makes dates load faster." ], correct: 1, explanation: "Marking as Date Table tells the engine to rely on your contiguous calendar, disabling wasteful auto-date-time tables and ensuring reliable time intelligence." },
          { question: "What is an 'Implicit Measure' in Power BI and why should it be avoided in professional models?", options: ["A measure written in hidden code.", "An automatic aggregation created when dragging a numeric column directly onto a visual canvas; it cannot be reused in other DAX formulas or documented cleanly.", "A measure that only works on text.", "A paid Power BI Pro feature." ], correct: 1, explanation: "Implicit measures lack explicit business logic, cannot be referenced by other formulas, and clutter the data model." }
        ],
        scenarios: [
          { question: "In an interview, you are asked: 'Explain the difference between Row Context and Filter Context in DAX to a non-technical stakeholder.' How do you explain it?", solution: "Row Context is like looking at a single row of a spreadsheet at a time—it knows the values on that exact row (like multiplying Price * Quantity on row 5). Filter Context is like applying dropdown filters to the entire table before you look at the total—it is the environment of active slicers, visual coordinates, and page filters that restrict what data the formula calculates." },
          { question: "How does organizing DAX measures into display folders with professional documentation impress hiring managers?", solution: "Junior candidates leave dozens of auto-generated measures scattered across tables. Presenting a dedicated `_Measures` table organized into logical folders (`01_Core_Financials`, `02_Operational_Health`) with a clean markdown dictionary proves you build enterprise-grade, maintainable business intelligence solutions." },
          { question: "Why did you use `USERELATIONSHIP` in the Churn Rate DAX measure instead of creating a second active relationship between Fact and Date tables?", solution: "Power BI strictly prohibits multiple active relationships between the same two tables to prevent ambiguous filter paths. Since `Fact_Mandates` has both `created_date` and `cancelled_date`, the `created_date` relationship is active by default. Using `USERELATIONSHIP` inside `CALCULATE` activates the inactive `cancelled_date` path specifically for churn calculations without breaking standard creation reports." }
        ],
        miniAssignment: "Write a DAX measure `[Net New Money]` that calculates Total Investment Inflows minus Total Redemptions."
      }
    },
    // DAY 54
    {
      day: 54, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Building the Interactive Executive & Operations Power BI Dashboard",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Design a 2-page enterprise dashboard canvas: Page 1 for Executive Strategy, Page 2 for Daily Operations Health.",
        "Implement a custom visual theme matching the corporate dark palette (`#0b1220`, `#121d2e`, `#43d19e`, `#68a7ff`, `#f4bd63`).",
        "Build interactive navigation controls, collapsible slicer panels, and drill-through pages.",
        "Add dynamic report page tooltips showing payment failure code distributions when hovering over gateway charts."
      ],
      prerequisites: "Power BI visual design (Phase 3) and FinTech DAX measures (Day 53).",
      expectedOutcome: "A completed 2-page production Power BI dashboard template and exported PDF/PNG executive presentation.",
      topics: [
        {
          concept: "2-Page Dashboard Architecture & Persona Separation",
          what: "Structuring the dashboard into two distinct analytical views: Page 1 (Executive Summary) answering high-level strategic questions, and Page 2 (Operations & Payment Rail Diagnostics) answering tactical execution questions.",
          why: "Mixing operational error logs with C-suite AUM metrics confuses both audiences; role-tailored pages provide immediate clarity.",
          how: "Page 1: 4 KPI Cards (Total AUM, Monthly GMV, Active SIPs, MoM Growth %), Monthly Inflow Trend (Combo Chart), Category Distribution (Donut), Top AMC Leaderboard (Bar). Page 2: Gateway Success Rate Gauge, Hourly Failure Heatmap, SLA Breach Alerts, Failure Code Waterfall.",
          example: "CFO opens Page 1 to review ₹18.5 Cr AUM growth; Operations Lead opens Page 2 to monitor Razorpay vs Cashfree hourly failure rates.",
          businessCase: "Serves both strategic and operational decision-making across the entire wealthtech business.",
          pitfalls: "Cluttering a single canvas with 15+ micro visuals, making the report impossible to scan or comprehend."
        },
        {
          concept: "Custom Theme, Accessibility & Visual Hierarchy",
          what: "Applying a consistent, branded design system with strict typographic hierarchy, high-contrast dark palette, card containers, and accessibility standards.",
          why: "Professional visual aesthetics build instant trust with stakeholders and make portfolio projects stand out from generic tutorials.",
          how: "Background: Deep slate (`#0b1220`); Card containers: Elevated navy (`#121d2e`) with 1px border (`#293950`); Success/Positive: Soft Emerald (`#43d19e`); Primary/Brand: Blue (`#68a7ff`); Warning: Amber (`#f4bd63`); Alert/Error: Coral Red (`#f87171`).",
          example: "All KPI card titles set to 12pt regular muted grey; main values set to 28pt bold white; trend indicators set to 12pt colored bold.",
          businessCase: "Standard enterprise UI/UX specifications expected at modern digital product companies.",
          pitfalls: "Using bright saturated rainbow colors with no semantic meaning (e.g. using 10 different colors for fund categories)."
        },
        {
          concept: "Interactive Tooltips, Bookmarks & Drill-Through",
          what: "Enhancing user interactivity using report page tooltips (hover popups), bookmark toggles (slicer panel show/hide), and right-click drill-through pages.",
          why: "Allows deep-dive exploration without cluttering the primary reporting canvas.",
          how: "Create a 320x240px hidden tooltip page configured to show Failure Reason Breakdown; link to the Gateway visual. Create bookmark actions to toggle a slide-out filter pane.",
          example: "Hovering over Razorpay's bar visual reveals a mini-chart showing 62% Bank Timeout, 28% Insufficient Funds, and 10% Expired Mandates.",
          businessCase: "Enables instant root-cause diagnosis in 1 click during live executive reviews.",
          pitfalls: "Hiding critical daily metrics behind deep drill-through menus where users cannot find them."
        }
      ],
      resources: [
        { title: "Power BI Dashboard Design Masterclass & Best Practices", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Dashboard+Design+Tips", time: "30 mins", covers: "Visual hierarchy, layout grids, and white space." },
        { title: "Report Page Tooltips & Interactive Bookmarks", platform: "Curibal", url: "https://www.youtube.com/results?search_query=Curibal+Power+BI+Report+Page+Tooltips", time: "30 mins", covers: "Step-by-step tooltip page setup and bookmark buttons." },
        { title: "Designing Accessible and High-Contrast Power BI Reports", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-creating-reports", time: "25 mins", covers: "Color contrast ratios, screen readers, and keyboard navigation." }
      ],
      timetable: [
        { time: "15 mins", activity: "Wireframe Layout: Sketch Page 1 and Page 2 visual grid on paper/Figma." },
        { time: "50 mins", activity: "Page 1 Build: Construct Executive KPI cards, Monthly GMV combo chart, and category donut." },
        { time: "25 mins", activity: "Page 2 Build: Construct Gateway success gauges, hourly failure matrix, and SLA alerts." },
        { time: "30 mins", activity: "Interactivity Suite: Configure report page tooltip, slicer panel bookmark, and drill-through." },
        { time: "40 mins", activity: "Business Assignment: Export high-resolution screenshots and author `04_DASHBOARD_WALKTHROUGH.md`." },
        { time: "20 mins", activity: "Assessment & Polish: Complete 5 MCQs and 3 dashboard critique questions." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Build the Executive KPI Card Container",
          problem: "Configure an executive KPI card visual displaying `[Total Captured GMV]` with formatted ₹ Crores, a sparkline trend, and dynamic MoM % indicator.",
          scenario: "Executive summary banner design.",
          instructions: "1. Add New Card visual.\n2. Set Callout Value to `[Total Captured GMV]` formatted as `₹#,##0,,.00 Cr`.\n3. Add Subtitle with `[GMV MoM Growth %]` formatted as `+0.0%;-0.0%`.\n4. Apply conditional color: Green if >= 0, Red if < 0.",
          expectedOutput: "A modern, formatted KPI card container.",
          hint: "Use the new Power BI Card (preview/modern) visual with multi-metric support.",
          solution: "Card Configuration:\n- Callout: [Total Captured GMV] -> Value: ₹18.42 Cr\n- Subtitle: [GMV MoM Growth %] -> Value: ▲ +12.4% MoM\n- Font Color Expression: IF([GMV MoM Growth %] >= 0, \"#43d19e\", \"#f87171\")\n- Container: Background #121d2e, Corner radius 12px, Border 1px #293950."
        },
        {
          title: "Guided Exercise 2: Report Page Tooltip Configuration",
          problem: "Create a dedicated report page tooltip that appears when hovering over any payment gateway on Page 2, displaying that gateway's top 3 failure codes.",
          scenario: "Operations diagnostic enhancement.",
          instructions: "1. Create Page named `Tooltip_FailureBreakdown`.\n2. In Page Info, enable 'Allow use as tooltip'.\n3. In Canvas settings, set Type to 'Tooltip' (320x240px).\n4. Add clustered bar chart: Y-axis `failure_code`, X-axis `[Total Failed Txns]`.\n5. Link to Gateway visual on Page 2.",
          expectedOutput: "Instant interactive hover tooltip.",
          hint: "Ensure the tooltip visual inherits filter context from the parent visual.",
          solution: "Tooltip Page Setup:\n- Page Type: Tooltip\n- Visual: Clustered Bar Chart\n- Data: Y-axis `dim_failure_codes[code]`, X-axis `[Failed Txns Count]`\n- Sorting: Descending by Failed Txns\n- Result: Hovering over 'Razorpay' instantly displays its failure breakdown without clicking."
        },
        {
          title: "Guided Exercise 3: Dynamic SLA Breach Warning Banner",
          problem: "Create a conditional card or text banner on Page 2 that displays '🚨 Gateway SLA Breach Detected' in bold red if any gateway has success rate < 95.0%, or '✅ All Payment Rails Operating Normally' in green.",
          scenario: "Operations real-time alert banner.",
          instructions: "Write a DAX measure returning the message and another returning the hex color code.",
          expectedOutput: "Two DAX measures for dynamic banner text and color.",
          hint: "Check `[Gateway SLA Compliance %] < 1.0`.",
          solution: "[SLA Alert Message] = \nIF(\n    [Gateway SLA Compliance %] < 1.0,\n    \"🚨 Operational Alert: One or more payment rails breaching 95.0% SLA threshold!\",\n    \"✅ Operational Status Normal: All payment gateways operating within 95.0% SLA\"\n)\n\n[SLA Alert Color] = IF([Gateway SLA Compliance %] < 1.0, \"#f87171\", \"#43d19e\")"
        }
      ],
      assignment: {
        title: "Publish Dashboard Screenshots & `04_DASHBOARD_WALKTHROUGH.md`",
        scenario: "Package the visual reporting layer of your Capstone for recruiter presentation.",
        deliverable: "1. Export high-resolution PNG screenshots of Page 1 (Executive Summary) and Page 2 (Operations Health).\n2. Create markdown document `04_DASHBOARD_WALKTHROUGH.md`.\n3. Include: Business Objectives, Page Architecture, Key Metrics Explained, Interactive Features Guide, and Business Insights Discovered.\n4. Save files in `/powerbi` and `/docs` directories.",
        completionCriteria: "Complete walkthrough document and polished screenshots ready for GitHub portfolio README."
      },
      assessment: {
        mcqs: [
          { question: "Why is a 2-page dashboard layout separating Executive vs Operations metrics superior to combining everything on 1 page?", options: ["Power BI only allows 4 visuals per page.", "Different stakeholders have different decision horizons: executives need monthly strategic trends; operations teams need daily error diagnostics.", "It allows you to use more bright colors.", "It hides data from users." ], correct: 1, explanation: "Separating audiences prevents cognitive overload and ensures each persona finds their actionable answers immediately." },
          { question: "What is the primary advantage of a Report Page Tooltip in Power BI?", options: ["It replaces the need for data modeling.", "It provides on-demand, contextual deep-dive details on hover without taking up valuable screen space on the main canvas.", "It plays audio files.", "It exports to Excel automatically." ], correct: 1, explanation: "Report page tooltips provide rich multi-visual context on demand, keeping primary canvases clean and uncluttered." },
          { question: "In dashboard design, what is 'Visual Hierarchy'?", options: ["Putting the company CEO's picture at the top.", "Arranging elements so that the viewer's eye naturally tracks from most important (KPI cards top-left) to supporting details (trends center) to line-item drilldowns (bottom).", "Alphabetical sorting of chart titles.", "Using 3D chart effects." ], correct: 1, explanation: "Visual hierarchy guides the user's attention intuitively, following standard reading patterns (top-to-bottom, left-to-right)." },
          { question: "What does the Power BI Bookmark feature allow you to do?", options: ["Bookmark web URLs in Microsoft Edge.", "Capture the current state of a report page (filters, visual visibility) to create interactive slide-out menus, button toggles, and guided stories.", "Save the file to OneDrive.", "Print on paper." ], correct: 1, explanation: "Bookmarks capture page configurations, powering advanced UI interactions like collapsible slicer panes." },
          { question: "Why should background colors on analytical dashboard cards use muted tones (e.g. navy #121d2e) rather than bright saturated colors?", options: ["Bright colors reduce monitor battery life.", "High-contrast bright backgrounds cause eye fatigue and overwhelm data ink, whereas muted backgrounds make accent metrics stand out clearly.", "Muted colors are required by Power BI.", "Bright colors are copyrighted." ], correct: 1, explanation: "Muted card backgrounds elevate visual content while preserving semantic accent colors (green/red) for real data insights." }
        ],
        scenarios: [
          { question: "During an interview presentation of your dashboard, the interviewer asks: 'If you only had 1 minute with the CEO, which 3 visual elements would you point to?' How do you respond?", solution: "I would direct the CEO to Page 1: 1) The Total Captured GMV card (₹18.4 Cr, +12.4% MoM) showing healthy topline growth; 2) The Mutual Fund Inflow Breakdown showing Equity funds driving 68% of volume; 3) The SLA Breach Alert highlighting that a 2.6% performance gap in secondary gateway rails leaked ₹48 Lakhs in potential GMV, which our smart-routing proposal recovers." },
          { question: "How does demonstrating accessible design principles (color contrast, text sizes, tooltips) in your portfolio reflect on your professional maturity?", solution: "It shows empathy for real business users. Enterprise applications must be accessible to users with visual impairments, readable on laptops under office lighting, and intuitive for busy managers. It proves you build production software, not just academic homework." },
          { question: "How would you handle a stakeholder who insists on adding 20 more tables and pie charts to your clean executive dashboard page?", solution: "I would apply BA stakeholder management principles: First, understand what business question they are trying to answer. Then, demonstrate that overloading the main page dilutes clarity, and propose creating a dedicated drill-through page or custom report page tooltip to answer their specific question on demand without compromising the executive overview." }
        ],
        miniAssignment: "List 4 visual design rules you followed to make your dashboard look like an enterprise SaaS product rather than a student project."
      }
    },

    // DAY 55
    {
      day: 55, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Writing the Business Requirement Document (BRD) & User Stories",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Author a production-grade Business Requirement Document (`05_BRD_SMART_ROUTING.md`) for an Automated SIP Smart-Routing & Retry Engine.",
        "Define comprehensive Functional Requirements (FRs), Non-Functional Requirements (NFRs), and System Constraints.",
        "Write 6 technical Agile User Stories with Gherkin Acceptance Criteria (`Given-When-Then`) covering success, failure, and edge cases.",
        "Construct a Requirements Traceability Matrix (RTM) linking business problems to data models, SQL queries, and dashboard metrics."
      ],
      prerequisites: "Business Analysis fundamentals, API concepts (Phase 4), and Capstone data findings.",
      expectedOutcome: "A comprehensive, enterprise-ready BRD document proving end-to-end technical business analysis excellence.",
      topics: [
        {
          concept: "Enterprise BRD Structure & Technical Precision",
          what: "A formal specification document translating business strategy, operational data findings, and customer pain points into exact software requirements for engineering teams.",
          why: "The definitive core competency of a top-tier Business Analyst; bridges the gap between data insights and engineering execution.",
          how: "Sections: 1. Document Control & Stakeholders; 2. Executive Summary & Business Problem; 3. Current State vs Future State; 4. In-Scope / Out-of-Scope; 5. Functional Requirements (FRs); 6. Non-Functional Requirements (NFRs); 7. Technical Architecture & Data Flows; 8. Acceptance Criteria & Test Cases.",
          example: "Requirement FR-101: 'The system shall evaluate real-time gateway success rates every 5 minutes and route outgoing mandate debits to the highest-performing rail.'",
          businessCase: "Standard deliverable governing engineering sprint backlogs at FinTech firms.",
          pitfalls: "Writing vague, untestable requirements (e.g. 'The system should be fast and reliable') instead of quantified specifications."
        },
        {
          concept: "Agile User Stories & Gherkin Acceptance Criteria",
          what: "Structuring requirements from the user perspective (`As a... I want to... So that...`) with formal Gherkin Given-When-Then behavioral acceptance tests.",
          why: "Eliminates ambiguity, aligns developers and QA automation engineers, and provides exact test cases for sprint sign-off.",
          how: "Given [initial context], When [event occurs], Then [expected system behavior], And [secondary outcome / error handling].",
          example: "Scenario: Nodal bank outage smart rerouting\nGiven Gateway A has experienced >= 3 consecutive 504 timeouts in 2 minutes\nWhen backend triggers SIP debit request for user #902\nThen system routes payment through Gateway B\nAnd logs event to operational telemetry with code `ROUTING_FAILOVER`.",
          businessCase: "Used in Jira / Confluence to define the sprint Definition of Done (DoD).",
          pitfalls: "Writing user stories without error branches or edge-case handling."
        },
        {
          concept: "Non-Functional Requirements (NFRs) & Traceability Matrix",
          what: "Defining architectural system qualities (Performance, Security, Compliance, Scalability) and mapping every requirement to its test case and data artifact via an RTM.",
          why: "In FinTech, security, RBI compliance, and latency SLAs are just as critical as user-facing features.",
          how: "NFRs: Latency <= 800ms, Availability >= 99.95%, Encryption: AES-256 at rest, TLS 1.3 in transit, Audit: Immutable logging for 7 years. RTM: Req ID <-> Business Objective <-> SQL Query <-> Power BI Visual <-> Test Case.",
          example: "RTM showing that Requirement FR-202 (Retry Funnel) is verified by SQL Query `02_failure_deepdive.sql` and monitored on Power BI Page 2.",
          businessCase: "Ensures no requirements are lost during engineering development or quality assurance.",
          pitfalls: "Treating NFRs as an afterthought or copying generic template bullets without financial relevance."
        }
      ],
      resources: [
        { title: "How to Write a World-Class Business Requirement Document (BRD)", platform: "Modern Analyst Guide", url: "https://www.modernanalyst.com/Resources/Articles/tabid/115/ID/1427/Business-Requirements-Document-BRD-Template.aspx", time: "35 mins", covers: "BRD templates, scope management, and functional vs non-functional requirements." },
        { title: "Writing Acceptance Criteria with Gherkin (Given-When-Then)", platform: "Agile Alliance", url: "https://www.agilealliance.org/glossary/gherkin/", time: "25 mins", covers: "BDD syntax, testable user stories, and scenario specifications." },
        { title: "Requirements Traceability Matrix (RTM) for Business Analysts", platform: "Bridging the Gap (Laura Brandenburg)", url: "https://www.youtube.com/results?search_query=Laura+Brandenburg+Business+Analyst+Requirements", time: "30 mins", covers: "RTM templates, stakeholder sign-offs, and requirement tracking." }
      ],
      timetable: [
        { time: "15 mins", activity: "BRD Outline: Review document structure and stakeholders." },
        { time: "50 mins", activity: "Business Problem & Scope: Detail current state data findings (₹48L leakage) and future state architecture." },
        { time: "25 mins", activity: "Functional & NFR Authoring: Write 6 detailed functional specs and 4 banking NFRs." },
        { time: "30 mins", activity: "Gherkin User Stories: Author 4 agile user stories with positive and negative Given-When-Then scenarios." },
        { time: "40 mins", activity: "Business Assignment: Complete `05_BRD_SMART_ROUTING.md` and RTM matrix table." },
        { time: "20 mins", activity: "Assessment & Review: Solve 5 MCQs and 3 BA requirement review scenarios." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Author Gherkin Acceptance Criteria for Smart Retry",
          problem: "Write a Gherkin scenario for an automated retry engine triggered when a payment fails due to transient bank timeout (`BANK_TIMEOUT`).",
          scenario: "Technical requirement specification for sprint backlog.",
          instructions: "Include Given, When, Then, and And clauses covering delay schedule and user notification.",
          expectedOutput: "Valid Gherkin test specification.",
          hint: "Specify the exact retry delay (24 hours) and push notification.",
          solution: "Feature: Automated SIP Smart Retry\nScenario: Retry on transient bank timeout\nGiven a scheduled SIP transaction fails with code 'BANK_TIMEOUT'\nWhen the retry engine evaluates the failure code\nThen system schedules Retry #1 for execution exactly 24 hours later\nAnd sends an in-app push notification: 'Your SIP debit of ₹5,000 had a temporary bank delay and will be automatically re-attempted tomorrow.'"
        },
        {
          title: "Guided Exercise 2: Formulate FinTech Non-Functional Requirements (NFRs)",
          problem: "Draft 4 precise, quantifiable Non-Functional Requirements for the payment smart-router covering: 1) Latency, 2) High Availability, 3) Data Security, and 4) Audit Compliance.",
          scenario: "Engineering architecture alignment.",
          instructions: "Every NFR must include a measurable metric and threshold.",
          expectedOutput: "4 structured NFR statements.",
          hint: "Avoid vague words like 'fast' or 'secure'.",
          solution: "1. Latency (NFR-01): The routing decision engine shall evaluate gateway health and select the optimal rail in <= 250 milliseconds at the 99th percentile (p99).\n2. Availability (NFR-02): The payment dispatch service shall maintain 99.95% uptime across all operational banking hours (24/7/365).\n3. Security (NFR-03): All payload data containing PAN, Bank Account Number, or customer PII shall be encrypted using AES-256 at rest and TLS 1.3 in transit, fully compliant with RBI Data Localization guidelines.\n4. Auditability (NFR-04): Every transaction routing decision, including evaluated gateway weights and response codes, shall be preserved in an immutable audit ledger for 7 years."
        },
        {
          title: "Guided Exercise 3: Construct the Requirements Traceability Matrix (RTM)",
          problem: "Build a 3-row RTM table linking: Requirement ID, Business Problem, Solution Feature, SQL Verification Script, Power BI Visual, and Test Case ID.",
          scenario: "Portfolio traceability verification.",
          instructions: "Connect the data findings from Day 50/51 to the requirements.",
          expectedOutput: "A structured 6-column RTM table.",
          hint: "Show the complete end-to-end lifecycle from data insight to software test.",
          solution: "| Req ID | Business Problem | Feature Spec | SQL Verification | Power BI Visual | Test Case ID |\n|---|---|---|---|---|---|\n| FR-101 | ₹48L GMV lost to gateway failure gap | Dynamic Smart Routing Engine | `01_core_kpi_queries.sql` (Q3) | Page 2: Gateway SLA Gauge | TC-ROUTER-01 |\n| FR-102 | Bank timeouts peaking 02-04 AM | Scheduled Off-Peak Retry | `02_failure_deepdive.sql` (Q1) | Page 2: Hourly Failure Heatmap | TC-RETRY-02 |\n| FR-103 | Lack of executive volume visibility | Automated Executive KPI reporting | `01_core_kpi_queries.sql` (Q1) | Page 1: Executive KPI Cards | TC-DASH-01 |"
        }
      ],
      assignment: {
        title: "Complete Production-Ready BRD: `05_BRD_SMART_ROUTING.md`",
        scenario: "You are authoring the core Business Analysis artifact that demonstrates to hiring managers that you possess true enterprise-grade specification skills.",
        deliverable: "1. Create file `05_BRD_SMART_ROUTING.md` in `/docs`.\n2. Sections: Executive Summary, Current State Problem Statement (backed by Day 50/51 data), Future State Target Architecture, Scope (In-Scope/Out-of-Scope), 6 Functional Requirements, 4 Non-Functional Requirements, 4 Gherkin User Stories, and Requirements Traceability Matrix.\n3. Format in clean GitHub-flavored markdown with tables.",
        completionCriteria: "Complete BRD covering all 8 sections with quantifiable metrics and zero vague statements."
      },
      assessment: {
        mcqs: [
          { question: "What is the primary difference between a Business Requirement Document (BRD) and a Functional Specification Document (FSD)?", options: ["A BRD is written by developers; an FSD is written by users.", "A BRD defines WHAT the business needs and WHY (business goals, scope, rules), while an FSD defines HOW the system will technically achieve it (database schemas, API contracts, UI wireframes).", "A BRD is only used in waterfall; FSD is only used in agile.", "There is no difference." ], correct: 1, explanation: "BRDs define the business needs and expected outcomes; FSDs and technical specs define the detailed technical implementation." },
          { question: "In Agile user stories, what does the 'Given' clause in Gherkin syntax establish?", options: ["The final conclusion.", "The initial preconditions, state, or context of the system before an action is taken.", "The name of the software tester.", "The date of the release." ], correct: 1, explanation: "Given establishes the initial setup or state of the system before the test trigger occurs." },
          { question: "Why is a Requirements Traceability Matrix (RTM) invaluable during a project audit?", options: ["It calculates company profit.", "It provides forward and backward traceability, proving that every business objective is addressed by a technical feature and verified by an automated test case.", "It replaces the need for a project manager.", "It deletes old files." ], correct: 1, explanation: "An RTM guarantees completeness, ensuring no requirement is forgotten and no unnecessary unrequested features are built." },
          { question: "What makes a Non-Functional Requirement (NFR) testable?", options: ["Writing it in capital letters.", "Including specific, quantifiable numerical thresholds (e.g. latency <= 250ms, uptime >= 99.95%) that automated tests can verify.", "Having the CEO sign it.", "Printing it on paper." ], correct: 1, explanation: "NFRs must be measurable and testable; subjective statements like 'the system shall be fast' cannot be verified." },
          { question: "In requirement engineering, what does 'MoSCoW' prioritization stand for?", options: ["Moscow, St. Petersburg, Kiev, Minsk.", "Must have, Should have, Could have, Won't have (this time).", "Manage, Optimize, Scale, Coordinate, Win.", "Monthly, Operational, Strategic, Customer, Weekly." ], correct: 1, explanation: "MoSCoW is a premier agile prioritization framework categorizing features by business criticality." }
        ],
        scenarios: [
          { question: "In an interview, the hiring manager asks: 'How do you prevent developers from misinterpreting your business requirements?' How do you answer?", solution: "I eliminate ambiguity through three techniques: 1) I use formal Gherkin Given-When-Then acceptance criteria that detail positive, negative, and edge-case behaviors; 2) I include concrete data examples and API payload samples directly in the story; 3) I hold interactive 3-Amigos backlog grooming sessions with engineering and QA before sprint kickoff to ensure everyone shares the exact same Definition of Done." },
          { question: "Why is anchoring a BRD in real data (like our SQL failure findings) far more effective than traditional requirement gathering?", solution: "Traditional requirements are often based on subjective opinions. When a BRD starts with data: 'Analysis of ₹18.5 Cr in volume revealed that bank timeouts during off-peak hours caused ₹32 Lakhs in lost GMV', leadership and engineering immediately understand the commercial ROI and urgency of the feature." },
          { question: "How does having a complete BRD in your GitHub portfolio position you ahead of 95% of other Business Analyst applicants?", solution: "Most applicants only showcase dashboards or basic SQL queries. A hiring manager reading a complete, professional BRD with Gherkin user stories and an RTM sees proof that you already operate at a Senior BA level: you know how to talk to business stakeholders, write enterprise specs, and collaborate with engineering." }
        ],
        miniAssignment: "Write a complete Agile User Story (As a... I want to... So that...) for an automated notification alerting users when their SIP debit fails due to low account balance."
      }
    },

    // DAY 56
    {
      day: 56, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Packaging the Portfolio: GitHub Repo, Documentation & Executive Walkthrough [Weekly Assessment 8]",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Structure an enterprise-grade GitHub portfolio repository (`fintech-operations-analytics-platform`).",
        "Author a high-impact `README.md` featuring project banners, business metrics, architecture diagrams, and interactive walkthrough links.",
        "Record a structured 3-minute executive walkthrough script or author a 10-slide presentation deck.",
        "Complete Weekly Assessment 8 consolidating end-to-end Capstone architecture, DAX, BRD specifications, and portfolio presentation."
      ],
      prerequisites: "Days 48–55 (Project Charter, Data Dictionary, SQL Suite, Excel Model, Power BI Dashboard, BRD).",
      expectedOutcome: "A complete, beautifully packaged GitHub portfolio repository ready to be shared with recruiters and hiring managers.",
      topics: [
        {
          concept: "GitHub Repository Architecture for Business & Data Analysts",
          what: "Organizing your portfolio project into clean, industry-standard directory structures that immediately communicate professionalism to technical reviewers.",
          why: "Recruiters and engineering leads judge your attention to detail within 10 seconds of opening your GitHub profile.",
          how: "Folder structure:\n├── README.md (Executive overview, problem, findings, screenshots)\n├── docs/\n│   ├── 01_PROJECT_CHARTER.md\n│   ├── 02_DATA_DICTIONARY.md\n│   └── 05_BRD_SMART_ROUTING.md\n├── sql/\n│   ├── schema_ddl.sql\n│   ├── 01_core_kpi_queries.sql\n│   └── 02_failure_deepdive.sql\n├── excel/\n│   └── FinTech_SIP_Reconciliation_Model.xlsx\n└── powerbi/\n    ├── 03_DAX_MEASURES.md\n    ├── 04_DASHBOARD_WALKTHROUGH.md\n    └── screenshots/",
          example: "Clean modular folders with descriptive filenames and zero temporary scratch files (`test.csv`, `copy_of_final.sql`).",
          businessCase: "Mirrors enterprise code repository governance at modern software firms.",
          pitfalls: "Dumping all files into a single root folder with generic names like `script.sql` and `report.pbix`."
        },
        {
          concept: "The Recruiter-Optimized `README.md` Blueprint",
          what: "A captivating, markdown-formatted project landing page designed to hook hiring managers who may only spend 60 seconds reviewing your application.",
          why: "Hiring managers rarely download `.pbix` files or run SQL scripts; they read your `README.md` to evaluate your business acumen and communication.",
          how: "Sections: 1. Project Title & Badges; 2. Executive TL;DR & Business Impact; 3. The Business Challenge; 4. System Architecture & Tech Stack; 5. Key Findings & Data Insights; 6. Interactive Dashboard Screenshots; 7. Business Requirements & Engineering Specs; 8. Repository Structure & How to Run.",
          example: "Header metric callout: '⚡ Impact: Identified ₹48 Lakhs in recoverable GMV and reduced payment failure leakage by 14% via smart routing.'",
          businessCase: "Drives interview callbacks by providing instant proof of business impact.",
          pitfalls: "Writing a technical tutorial on how to install software instead of explaining the business problem and your findings."
        },
        {
          concept: "The 3-Minute Executive Portfolio Walkthrough",
          what: "A crisp, structured spoken narrative (for Loom video or live interview presentation) guiding stakeholders through the project in under 180 seconds.",
          why: "Technical skills get you considered; executive communication gets you hired and commands higher salary offers.",
          how: "Structure: 30s: Problem & Context -> 45s: Data Architecture & Diagnostics -> 45s: Interactive Dashboard & ROI -> 45s: Business Requirement Document & Engineering Hand-off -> 15s: Conclusion.",
          example: "'Hello, I'm presenting our FinTech SIP Operations Analytics Platform. We analyzed ₹18.5 Crore in recurring mutual fund investments...'",
          businessCase: "Standard framework used in second-round hiring manager interviews.",
          pitfalls: "Getting bogged down in trivial code details (e.g. explaining what a comma does in SQL) instead of focusing on business outcomes."
        }
      ],
      resources: [
        { title: "How to Build a Standout Data & Business Analyst GitHub Portfolio", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+GitHub+Portfolio", time: "30 mins", covers: "Repository structure, README markdown formatting, and project presentation." },
        { title: "Writing a Compelling Project README that Recruiters Love", platform: "freeCodeCamp Guide", url: "https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/", time: "25 mins", covers: "Badges, markdown tables, screenshot embedding, and license setup." },
        { title: "Presenting Data Projects to Executive Leadership (Storytelling)", platform: "Storytelling with Data (Cole Nussbaumer)", url: "https://www.storytellingwithdata.com/blog", time: "30 mins", covers: "Executive presentations, narrative arcs, and visual pacing." }
      ],
      timetable: [
        { time: "15 mins", activity: "Repo Architecture: Set up clean directory hierarchy and verify all artifact files." },
        { time: "50 mins", activity: "README.md Authoring: Write executive summary, business impact badges, and architecture tables." },
        { time: "25 mins", activity: "Screenshot & Media Embedding: Insert visual dashboard cards and ERD diagrams into README." },
        { time: "30 mins", activity: "Executive Walkthrough Script: Draft and rehearse the 3-minute spoken presentation script." },
        { time: "40 mins", activity: "Weekly Assessment 8: Complete cumulative 20-question evaluation covering Capstone & Portfolio." },
        { time: "20 mins", activity: "Git Push & Verification: Commit entire portfolio repository and preview live on GitHub." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Author the Business Impact Callout Block",
          problem: "Write a high-converting Markdown callout block for the top of your `README.md` summarizing the project's financial and operational impact.",
          scenario: "Recruiter hook section.",
          instructions: "Use markdown tables or blockquotes with bold metrics and emojis.",
          expectedOutput: "A striking, professional executive summary card.",
          hint: "Highlight: Volume analyzed, Recoverable GMV, Success rate improvement, Time to reconcile.",
          solution: "> ### 📊 Executive Impact Summary\n> - **Total Volume Analyzed:** ₹18.5 Crore ($2.2M USD) across 150,000+ recurring SIP transactions.\n> - **Revenue Leakage Identified:** ₹48 Lakhs in monthly failed transactions caused by secondary gateway latency.\n> - **Operational Optimization:** Automated smart-routing BRD projected to recover **+14% in retained GMV**.\n> - **Finance Productivity:** Excel reconciliation engine cut daily operations variance matching from **3 hours to 10 minutes**."
        },
        {
          title: "Guided Exercise 2: Script the 3-Minute Interview Walkthrough",
          problem: "Write a 5-paragraph spoken script timing out to exactly 180 seconds for a portfolio walkthrough.",
          scenario: "Hiring manager interview second round.",
          instructions: "Paragraph 1: Context; Paragraph 2: Methodology; Paragraph 3: Core Discovery; Paragraph 4: Solution (BRD); Paragraph 5: Career Takeaway.",
          expectedOutput: "A polished, conversational presentation script.",
          hint: "Target ~130 words per minute (~390 words total).",
          solution: "[0:00 - 0:30] Context: 'In this capstone, I set out to solve a major operational challenge in digital wealthtech: automated SIP mandate failure leakage. When recurring investments fail, companies don't just lose transaction volume—they lose customer trust and long-term AUM.'\n\n[0:30 - 1:15] Methodology: 'I architected a 7-table normalized relational data model simulating 150,000 customer investment events. Using PostgreSQL, I authored an analytical suite investigating gateway performance, hourly bank nodal outages, and customer cohort retention.'\n\n[1:15 - 2:00] Discovery: 'The data revealed two major insights: first, a 2.6% success rate gap between gateways leaked ₹48 Lakhs monthly. Second, 64% of bank timeouts clustered between 2 AM and 4 AM during routine bank maintenance. In parallel, I built an Excel financial model to reconcile gateway settlements against internal ledgers with zero variance.'\n\n[2:00 - 2:45] Solution: 'Rather than stopping at analysis, I acted as the Business Analyst. I built an interactive 2-page Power BI dashboard for executive and operations monitoring, and authored an enterprise BRD specifying an automated smart-routing and 24-hour retry engine with Gherkin acceptance criteria.'\n\n[2:45 - 3:00] Conclusion: 'This project bridges the gap between deep data querying and product execution—the exact value I bring to your Business Analyst team.'"
        },
        {
          title: "Guided Exercise 3: GitHub Badges and Tech Stack Specification",
          problem: "Write the Markdown code to embed tech stack badges (PostgreSQL, Power BI, Excel, Postman, Markdown, Git) at the top of your repository.",
          scenario: "Visual polish of portfolio repo.",
          instructions: "Use shields.io badge syntax.",
          expectedOutput: "Formatted badge Markdown line.",
          hint: "`![Name](https://img.shields.io/badge/...)`.",
          solution: "![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) ![PowerBI](https://img.shields.io/badge/Power_BI-F2C811?style=flat&logo=powerbi&logoColor=black) ![Excel](https://img.shields.io/badge/Microsoft_Excel-217346?style=flat&logo=microsoftexcel&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white) ![Agile](https://img.shields.io/badge/Agile-Scrum_&_BRD-blue) ![License](https://img.shields.io/badge/License-MIT-green)"
        }
      ],
      assignment: {
        title: "Publish Complete GitHub Portfolio Repository & README.md",
        scenario: "Assemble the final public-facing capstone repository representing your complete technical capability.",
        deliverable: "1. Create master `README.md` in root directory.\n2. Ensure all subdirectories (`/docs`, `/sql`, `/excel`, `/powerbi`) are fully populated and linked from the README.\n3. Add MIT license file (`LICENSE`).\n4. Rehearse the 3-minute executive walkthrough script aloud until fluid.\n5. Save repository link in dashboard portfolio tab.",
        completionCriteria: "Complete master README with zero broken image or markdown links, and all 6 project artifacts committed."
      },
      assessment: {
        mcqs: [
          { question: "Why is having a comprehensive `README.md` more important than having thousands of lines of raw code on GitHub?", options: ["GitHub charges money for code files.", "Hiring managers and recruiters rarely have time to clone and execute code; they evaluate your communication, business problem framing, and analytical insights from the README.", "README files are required by law.", "Search engines only index README files." ], correct: 1, explanation: "Recruiters and hiring managers spend 30-60 seconds on a repo; a compelling README immediately communicates your business value." },
          { question: "What is the recommended duration for an asynchronous video walkthrough (e.g. Loom) of a portfolio project?", options: ["30 to 45 minutes.", "2 to 3 minutes.", "15 seconds.", "2 hours." ], correct: 1, explanation: "A 2 to 3 minute video is ideal: long enough to demonstrate depth, but short enough to respect a busy recruiter's schedule." },
          { question: "Why should code files in a portfolio repository include detailed comments and uppercase SQL keywords?", options: ["It increases file size.", "It proves code discipline, readability, and adherence to production software engineering standards.", "It makes the computer run faster.", "SQL will not execute lowercase letters." ], correct: 1, explanation: "Consistent formatting and clear comments prove that you write maintainable code intended for team collaboration." },
          { question: "What does an MIT License communicate when added to your open-source portfolio repository?", options: ["You are a student at MIT.", "It permits others to freely view, study, and reuse your work while protecting you from liability, standard for open software portfolios.", "It prevents people from seeing your code.", "It automatically registers a copyright." ], correct: 1, explanation: "The MIT license is the open-source industry standard, allowing reviewers to inspect and test your work freely." },
          { question: "In the 3-minute walkthrough narrative, why should you mention the financial impact (e.g. ₹48 Lakhs) within the first 60 seconds?", options: ["To brag about money.", "To immediately anchor the project in business ROI, proving you are a commercially minded Business Analyst rather than an academic student.", "To confuse the interviewer.", "Because numbers are easy to remember." ], correct: 1, explanation: "Anchoring your presentation in quantifiable business ROI immediately distinguishes you as a commercially mature candidate." }
        ],
        scenarios: [
          { question: "In an interview, the interviewer clicks on your GitHub repository during the call. What do they see that makes them say 'Wow'?", solution: "They see an impeccably organized repository: an executive README with shields.io badges and quantifiable impact metrics, high-resolution screenshots of an accessible dark-theme Power BI dashboard, clean modular folders (`/sql`, `/powerbi`, `/excel`, `/docs`), and an enterprise BRD with Gherkin user stories. It looks like the work of an experienced mid-level analyst, not a beginner." },
          { question: "How do you explain the transition from your previous role as a Junior BA to a strong Technical BA during your portfolio walkthrough?", solution: "I explain that in my current role, I mastered agile requirements, stakeholder communication, and user stories. Over the last 60 days, I deliberately leveled up my technical muscle—mastering advanced SQL querying, star schema dimensional modeling, DAX time intelligence, and API contracts—so I can now bridge business strategy and deep technical engineering seamlessly." },
          { question: "Why is linking your Project 1 (Excel Modeling) and Project 2 (FinTech Operations) in your portfolio valuable?", solution: "Project 1 proves deep spreadsheet mastery, financial functions, and pivot modeling. Project 2 proves end-to-end data architecture across SQL, Power BI, APIs, and enterprise BRD documentation. Together, they demonstrate a complete, versatile toolkit capable of handling any analytics or requirement challenge." }
        ],
        miniAssignment: "Write the 3-sentence summary that you will place directly under your name on your portfolio and resume."
      }
    },
    // DAY 57
    {
      day: 57, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Resume Engineering & LinkedIn Re-Positioning for BA/Product Roles",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Transform a Junior Business Analyst resume into an ATS-optimized, high-impact Technical BA / Product Analyst resume.",
        "Master the Google XYZ resume bullet formula: 'Accomplished [X] as measured by [Y] by doing [Z]'.",
        "Re-engineer your LinkedIn profile: Headline, About story, Featured Portfolio projects, and Technical Skill Endorsements.",
        "Build a keyword matrix matching target job descriptions across FinTech, E-commerce, and SaaS sectors."
      ],
      prerequisites: "Completed Capstone Portfolio artifacts (Days 48–56).",
      expectedOutcome: "A polished 1-page ATS-compliant PDF resume and re-engineered LinkedIn profile blueprint ready to attract recruiter outreach.",
      topics: [
        {
          concept: "ATS Algorithms & Clean Resume Architecture",
          what: "Structuring your resume so Applicant Tracking Systems (Workday, Greenhouse, Lever, Taleo) can parse your work history, skills, and metrics with 100% accuracy.",
          why: "Over 75% of resumes are filtered out by automated ATS scanners before a human recruiter ever sees them; complex multi-column templates cause parsing failures.",
          how: "Use single-column layout, standard headings (`Work Experience`, `Technical Skills`, `Projects`, `Education`), clear dates (Month YYYY), and pure PDF export without text boxes, tables, or graphic icons.",
          example: "Replacing a 2-column Canva resume that scored 38% on ATS parse tests with a clean single-column structure scoring 96%.",
          businessCase: "Ensuring your job applications consistently pass automated filters and reach hiring managers.",
          pitfalls: "Using rating bars (e.g. 'SQL: 4/5 stars') or graphical skill bubbles which ATS algorithms cannot read."
        },
        {
          concept: "The Google XYZ Resume Bullet Formula",
          what: "Writing quantifiable, achievement-oriented bullets using the formula: 'Accomplished [X] as measured by [Y] by doing [Z]'.",
          why: "Listing passive duties ('Responsible for writing user stories') fails to differentiate you; highlighting quantifiable business outcomes wins interviews.",
          how: "Weak: 'Wrote SQL queries and made Power BI reports.' Strong: 'Engineered an automated payment failure diagnostic suite in PostgreSQL and Power BI, analyzing ₹18.5 Cr in GMV and identifying ₹48 Lakhs in recoverable volume via dynamic smart-routing specs.'",
          example: "Transforming 5 bullet points into data-driven achievement statements with specific financial impact numbers.",
          businessCase: "Proves that you drive business value rather than just completing administrative tasks.",
          pitfalls: "Omitting the metric [Y] or failing to explain the specific tool/technique [Z] used."
        },
        {
          concept: "LinkedIn Algorithm Optimization & Inbound Recruiter Funnel",
          what: "Optimizing your LinkedIn Headline, About section, Skills, and Featured carousel to trigger recruiter search queries.",
          why: "The best job opportunities come through inbound recruiter outreach rather than competing with 500 applicants on job board portals.",
          how: "Headline formula: `Target Title | Core Technical Stack | Domain Focus | Quantifiable Impact`. Example: `Business Analyst | SQL · Power BI · Advanced Excel · REST APIs | FinTech & WealthTech | Data-Driven Product Requirements`.",
          example: "Featured section showcasing clickable links to your GitHub Portfolio, live Dashboard demo, and BRD specification.",
          businessCase: "Triples profile appearances in recruiter search results within 14 days.",
          pitfalls: "Leaving the default headline ('Business Analyst at XYZ Company') which wastes prime search keyword real estate."
        }
      ],
      resources: [
        { title: "How to Write a Technical Resume that Gets You Hired (Google XYZ)", platform: "Google Careers & Tech Lead", url: "https://www.youtube.com/results?search_query=Google+Recruiter+Resume+Tips+XYZ+Formula", time: "30 mins", covers: "The XYZ formula, quantifiable metrics, and ATS optimization." },
        { title: "LinkedIn Profile Optimization for Data & Business Analysts", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+LinkedIn+Profile+Tips", time: "30 mins", covers: "Headlines, About section storytelling, and recruiter keyword search." },
        { title: "ATS Resume Checker & Free Scanner Guide", platform: "Jobscan Guide", url: "https://www.jobscan.co/blog/ats-resume/", time: "25 mins", covers: "How applicant tracking systems parse resumes and score keyword matches." }
      ],
      timetable: [
        { time: "15 mins", activity: "Job Description Audit: Analyze 3 target BA / Product Analyst job posts and extract keywords." },
        { time: "50 mins", activity: "Resume Overhaul: Rewrite your work experience bullets using the Google XYZ formula." },
        { time: "25 mins", activity: "Project Section Build: Add Capstone Project 1 and 2 with GitHub and demo links." },
        { time: "30 mins", activity: "LinkedIn Engineering: Craft new Headline, 3-paragraph About story, and Featured section." },
        { time: "40 mins", activity: "Business Assignment: Finalize ATS-compliant 1-page PDF Resume and LinkedIn profile blueprint." },
        { time: "20 mins", activity: "Assessment & Checklist: Complete 5 MCQs and 3 resume critique challenges." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Transform Weak Bullets with the XYZ Formula",
          problem: "Rewrite this weak bullet: 'Responsible for requirements gathering and writing user stories for the development team in Jira.'",
          scenario: "Resume bullet transformation.",
          instructions: "Apply: Accomplished [X] as measured by [Y] by doing [Z].",
          expectedOutput: "A powerful, metrics-driven bullet point.",
          hint: "Quantify the sprints, stories, velocity improvement, or on-time delivery rate.",
          solution: "Rewritten Bullet:\n'Authored 45+ technical user stories with formal Gherkin acceptance criteria across 8 sprint cycles, reducing post-deployment defect rates by 22% and accelerating engineering sprint velocity by 1.5x through collaborative 3-Amigos backlog grooming.'"
        },
        {
          title: "Guided Exercise 2: Craft Your LinkedIn About Section",
          problem: "Write a 3-paragraph LinkedIn 'About' section that tells your career transition story compellingly.",
          scenario: "LinkedIn profile overhaul.",
          instructions: "Paragraph 1: Who you are and your core superpower; Paragraph 2: Technical toolkit & recent projects; Paragraph 3: Career direction & call to action.",
          expectedOutput: "A polished, engaging personal narrative.",
          hint: "Highlight your FinTech background and blend of business empathy + technical depth.",
          solution: "Paragraph 1 (The Hook): 'I am a Business Analyst who bridges the gap between commercial strategy and deep technical engineering. With hands-on experience in FinTech and digital financial operations, I specialize in translating complex transactional data into actionable product requirements and automated systems.'\n\nParagraph 2 (The Toolkit): 'My analytical toolkit spans advanced SQL (window functions, cohort analysis), Power BI (star schema modeling, DAX time intelligence), financial spreadsheet modeling, and REST API specification with Postman. In my latest capstone, I analyzed ₹18.5 Cr in recurring mutual fund investments, authoring an enterprise BRD and smart-routing logic to reclaim ₹48 Lakhs in lost GMV.'\n\nParagraph 3 (The Vision): 'I am passionate about building data-informed digital products that simplify financial access. Exploring Business Analyst, Product Analyst, and Business Analytics opportunities where technical rigor and business impact converge. Let’s connect: [Email/LinkedIn]'"
        },
        {
          title: "Guided Exercise 3: Technical Skills Matrix for ATS Optimization",
          problem: "Organize your technical skills into 5 clean categories formatted for maximum ATS readability.",
          scenario: "Resume technical skills section.",
          instructions: "Categories: Business Analysis, Data & Analytics, Technical Tools, Methodologies, Domain Knowledge.",
          expectedOutput: "Structured 5-line skills block.",
          hint: "Use pipe (|) or comma separators; avoid graphical tables.",
          solution: "- Business Analysis: Requirements Gathering, BRD / PRD Authoring, Gherkin User Stories, RTM, Stakeholder Management, GAP Analysis\n- Data & Analytics: SQL (PostgreSQL), Power BI, Advanced Excel (XLOOKUP, Pivot Tables, What-If), DAX, Data Modeling (Star Schema), Cohort Retention\n- Technical Tools: Postman, Git/GitHub, Jira, Confluence, Draw.io, Figma (Wireframing)\n- Agile Methodologies: Scrum, Sprint Planning, Backlog Grooming, MoSCoW Prioritization, RICE Scoring, 5-Whys RCA\n- Domain Knowledge: FinTech, Recurring SIPs, NACH e-Mandates, Payment Gateways (Razorpay/Cashfree), Financial Reconciliation"
        }
      ],
      assignment: {
        title: "Publish ATS-Optimized 1-Page Resume & LinkedIn Blueprint",
        scenario: "Finalize your primary career transition marketing assets.",
        deliverable: "1. Create markdown file `06_RESUME_AND_LINKEDIN_BLUEPRINT.md`.\n2. Complete 1-page resume copy with: Contact header, Professional Summary, Work Experience with XYZ bullets, Portfolio Projects (Project 1 & Project 2 with links), Technical Skills matrix, and Education.\n3. Add LinkedIn Headline, About section, and Featured cards plan.\n4. Export resume as clean single-column PDF.",
        completionCriteria: "Complete 1-page resume text and LinkedIn blueprint with 100% XYZ-formatted bullet points."
      },
      assessment: {
        mcqs: [
          { question: "Why do graphical multi-column resume templates often fail in automated ATS scanners?", options: ["ATS software prefers black-and-white text.", "Many ATS parsers read left-to-right across the entire page, merging text from parallel columns into garbled, unreadable paragraphs.", "Multi-column templates take too long to download.", "ATS algorithms only accept handwritten documents." ], correct: 1, explanation: "Multi-column layouts confuse text-parsing parsers, causing them to scramble work histories and reject candidates automatically." },
          { question: "In the Google XYZ formula ('Accomplished [X] measured by [Y] by doing [Z]'), what does [Y] represent?", options: ["The year you graduated.", "A quantifiable metric, percentage, currency amount, or time saved proving the impact of your work.", "The company's CEO name.", "Your salary expectation." ], correct: 1, explanation: "[Y] is the measurable outcome (e.g. 'reduced defect rates by 22%', 'reclaimed ₹48 Lakhs') that proves your commercial value." },
          { question: "What is the primary benefit of including direct GitHub and Live Dashboard links in your resume header?", options: ["It fills empty white space.", "It provides instant, verifiable proof of your technical skills, allowing curious recruiters and hiring managers to validate your claims with one click.", "It increases PDF file size.", "It is required by LinkedIn." ], correct: 1, explanation: "Direct links transform subjective resume claims into objective, verifiable evidence that sets you apart from generic applicants." },
          { question: "Why should your LinkedIn Headline include target role titles (e.g. 'Business Analyst | Product Analyst') rather than just your current job title?", options: ["Recruiters search LinkedIn by target role keywords; having those titles in your headline ensures you appear in their search candidate results.", "It is a requirement of the platform.", "It hides your current company.", "To impress your friends." ], correct: 0, explanation: "Recruiters use keyword search queries to source candidates; including your target titles optimizes your search placement." },
          { question: "What is the ideal page length for a Business Analyst resume with 1 to 4 years of experience?", options: ["3 to 4 pages.", "Strictly 1 page.", "10 pages.", "Half a page." ], correct: 1, explanation: "For early-to-mid career professionals, a concise, densely packed 1-page resume is the gold standard across global tech firms." }
        ],
        scenarios: [
          { question: "If a recruiter asks: 'Your current title is Junior Business Analyst, but your resume highlights advanced SQL, Power BI, and API specs. How did you acquire these skills?' How do you answer?", solution: "I explain with confidence: 'In my daily BA work, I recognized that requirements are only as good as the data and technical architecture behind them. Rather than waiting for senior engineers or data analysts, I proactively upskilled—completing a rigorous 60-day, 180-hour technical journey covering advanced relational SQL, star schema DAX modeling, Postman API testing, and enterprise BRD authoring. The projects on my resume reflect hands-on, production-grade applications of those skills.'" },
          { question: "How does framing your future goal of a Master's degree abroad in 2028 help your current career positioning?", solution: "It demonstrates long-term ambition, intellectual discipline, and a commitment to mastery. Positioning yourself as a candidate dedicated to continuous technical growth signals to hiring managers that you are high-potential talent who will rapidly deliver outsized value in your next role." },
          { question: "What should you do if an ATS scanner flags that your resume lacks a keyword from the job posting?", solution: "I tailor the resume specifically for that application: if the posting asks for 'Agile Backlog Grooming' and my resume says 'Sprint Story Refinement', I adjust the terminology to match the job post's exact phrasing while ensuring every statement remains 100% honest and accurate." }
        ],
        miniAssignment: "Write 2 high-impact resume bullets about your experience in Sprint Coordination and User Story authoring using the Google XYZ formula."
      }
    },

    // DAY 58
    {
      day: 58, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Technical Mock Interview Simulation: Excel, SQL & Power BI",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Simulate a live, timed technical interview covering live SQL coding, DAX filter context, and Excel financial modeling.",
        "Practice solving 5 high-frequency SQL live-coding challenges under pressure (joins, window rankings, CTEs).",
        "Master the live verbal explanation technique for complex data concepts to non-technical and technical interviewers.",
        "Complete a 60-minute recorded self-interview answering 10 core technical questions."
      ],
      prerequisites: "Excel (Phase 1), SQL (Phase 2), Power BI (Phase 3).",
      expectedOutcome: "The ability to confidently solve live technical coding challenges and explain architectural choices during high-stakes interviews.",
      topics: [
        {
          concept: "Live Technical Coding Interview Strategy",
          what: "The structured methodology for tackling live coding challenges on platforms like CoderPad, HackerRank, or shared screens.",
          why: "Candidates often freeze or jump into writing code prematurely; having a proven 4-step framework ensures composure and clarity.",
          how: "The 4-Step Framework: 1. Clarify Requirements (Ask edge-case questions, confirm table schemas and null handling); 2. State Your Approach (Talk through your logic before typing a single line); 3. Code Incrementally (Write CTEs/base SELECTs first and run them); 4. Test & Optimize (Walk through with sample inputs, discuss indexing and time complexity).",
          example: "Interviewer asks for 'Top 3 spending customers per month'; you clarify tie-breaking rules before choosing between `RANK()` vs `DENSE_RANK()`.",
          businessCase: "Separates nervous, hasty coders from methodical, senior-thinking engineering candidates.",
          pitfalls: "Remaining silent for 5 minutes while typing code, leaving the interviewer with zero visibility into your thought process."
        },
        {
          concept: "Explaining Technical Tradeoffs & Filter Context",
          what: "Articulating WHY you chose a specific analytical approach over alternatives (e.g. CTE vs Subquery, Star Schema vs Flat Table, Calculated Column vs DAX Measure).",
          why: "Senior interviewers don't just care if your query runs; they care about how you reason about memory, performance, and maintainability.",
          how: "Structure answers as: 'I chose [Option A] because of [Performance/Readability benefit]. While [Option B] works, it has [Downside/Limitation] in a production environment.'",
          example: "Explaining why measures are calculated dynamically at query time using VertiPaq engine cache rather than bloating RAM with calculated columns.",
          businessCase: "Demonstrates true technical depth rather than superficial tutorial memorization.",
          pitfalls: "Dogmatically claiming one tool is always better without recognizing context and constraints."
        },
        {
          concept: "Troubleshooting & Debugging Under Pressure",
          what: "Responding gracefully when an interviewer points out a bug, edge-case failure, or performance bottleneck in your solution.",
          why: "Interviewers deliberately introduce bugs or edge cases to see how you respond to feedback and collaborate under pressure.",
          how: "Acknowledge calmly: 'That’s a great edge case. Let me trace how my query handles NULL values here... Ah, I see that INNER JOIN drops customers with zero orders. We should switch to a LEFT JOIN with COALESCE to capture them.'",
          example: "Spotting a divide-by-zero bug in a DAX measure and immediately wrapping it in `DIVIDE(..., 0)`.",
          businessCase: "Proves you are coachable, resilient, and collaborative in sprint environments.",
          pitfalls: "Becoming defensive or arguing with the interviewer when an error is highlighted."
        }
      ],
      resources: [
        { title: "Top 20 SQL Interview Questions for Business Analysts & Data Analysts", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+Interview+Questions", time: "35 mins", covers: "Joins, aggregations, window functions, and live coding tips." },
        { title: "Power BI & DAX Interview Questions & Scenario Solutions", platform: "Guy in a Cube", url: "https://www.youtube.com/results?search_query=Guy+in+a+Cube+Power+BI+Interview+Questions", time: "30 mins", covers: "Filter context, star schema design, and measure optimization." },
        { title: "Ace the Coding Interview: Think Aloud Framework", platform: "freeCodeCamp", url: "https://www.freecodecamp.org/news/coding-interview-tips-how-to-think-aloud/", time: "25 mins", covers: "Verbal communication, clarifying questions, and incremental coding." }
      ],
      timetable: [
        { time: "15 mins", activity: "Interview Warm-up: Review 4-step live coding framework." },
        { time: "50 mins", activity: "SQL Live Coding Drill: Solve 5 classic interview challenges in timed 10-minute blocks." },
        { time: "25 mins", activity: "Power BI & DAX Deep Dive: Answer 3 advanced filter context and modeling questions aloud." },
        { time: "30 mins", activity: "Excel Rapid Fire: Answer 3 modeling and formula scenarios without touching a mouse." },
        { time: "40 mins", activity: "Business Assignment: Complete 60-minute recorded self-interview and review playback." },
        { time: "20 mins", activity: "Assessment & Reflection: Complete 5 MCQs and document areas for technical revision." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Live Coding Challenge: Top 3 Spending Users per Category",
          problem: "Write a SQL query returning the Top 3 investors by total invested amount within each mutual fund category. If there are ties, do not skip rank numbers.",
          scenario: "Live interview coding challenge.",
          instructions: "1. Clarify what happens with ties (use DENSE_RANK).\n2. Write CTE aggregating user volume per category.\n3. Apply DENSE_RANK() OVER (PARTITION BY category ORDER BY volume DESC).\n4. Filter where rank <= 3.",
          expectedOutput: "Clean SQL CTE solution.",
          hint: "DENSE_RANK() partitioned by category.",
          solution: "WITH user_category_spend AS (\n  SELECT \n    mf.category,\n    t.user_id,\n    SUM(t.amount) AS total_invested\n  FROM fact_transactions t\n  JOIN dim_mutual_funds mf ON t.fund_id = mf.fund_id\n  WHERE t.status = 'CAPTURED'\n  GROUP BY mf.category, t.user_id\n),\nranked_users AS (\n  SELECT \n    category,\n    user_id,\n    total_invested,\n    DENSE_RANK() OVER (PARTITION BY category ORDER BY total_invested DESC) AS rank_num\n  FROM user_category_spend\n)\nSELECT category, user_id, total_invested, rank_num\nFROM ranked_users\nWHERE rank_num <= 3\nORDER BY category, rank_num;"
        },
        {
          title: "Guided Exercise 2: Live DAX Debugging: Why is my Total Incorrect?",
          problem: "An interviewer shows you a DAX measure that displays correct values per row in a table visual, but the Grand Total row shows the wrong number. How do you explain and fix it?",
          scenario: "Power BI technical interview question.",
          instructions: "Explain the concept of measure evaluation in table grand total rows.",
          expectedOutput: "Clear verbal explanation and SUMX solution.",
          hint: "The total row is NOT a sum of the visual rows; it is evaluated in an empty filter context.",
          solution: "Explanation: 'In Power BI, the Total row does not sum the numbers displayed above it. Instead, the measure is re-evaluated across the entire table without the row filter context. If the measure uses row-specific logic, the total row calculates against the grand total context. To fix this and force Power BI to sum the displayed rows, we use SUMX over the dimension values: `Total Fixed = SUMX(VALUES(Dim_Entity[Name]), [MeasureName])`.'"
        },
        {
          title: "Guided Exercise 3: Excel Rapid Fire: VLOOKUP vs XLOOKUP vs INDEX/MATCH",
          problem: "Explain to an interviewer why modern analysts use XLOOKUP or INDEX/MATCH instead of legacy VLOOKUP.",
          scenario: "Excel conceptual interview question.",
          instructions: "List 4 technical advantages of XLOOKUP over VLOOKUP.",
          expectedOutput: "4 structured technical arguments.",
          hint: "Left lookups, column insertion stability, default exact match, missing value handling.",
          solution: "1. Leftward Lookups: VLOOKUP can only search from left-to-right; XLOOKUP can search in any direction.\n2. Structural Stability: VLOOKUP relies on hardcoded column index numbers (e.g. 3) which break if someone inserts a column; XLOOKUP uses dynamic range references that adjust automatically.\n3. Default Exact Match: VLOOKUP defaults to approximate match (TRUE), causing dangerous lookup errors if omitted; XLOOKUP defaults safely to exact match.\n4. Built-in Error Handling: XLOOKUP has a native `[if_not_found]` argument, eliminating cumbersome `=IFERROR(VLOOKUP(...), 0)` wrappers."
        }
      ],
      assignment: {
        title: "Record 60-Minute Self-Mock Technical Interview & Self-Evaluation",
        scenario: "Put your technical articulation under realistic pressure.",
        deliverable: "1. Create markdown file `07_TECHNICAL_INTERVIEW_PREP.md`.\n2. Answer 10 core technical questions in writing (or record audio/video on phone/Loom).\n3. Questions include: SQL Execution Order, Indexing Basics, Star Schema Design, DAX CALCULATE Filter Context, XLOOKUP vs INDEX/MATCH, and API Status Code Taxonomy.\n4. Grade yourself against the 4-step framework rubric.",
        completionCriteria: "Complete answers to all 10 technical questions with structured explanations and code snippets."
      },
      assessment: {
        mcqs: [
          { question: "What is the true logical execution order of SQL clauses behind the scenes?", options: ["SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY", "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT", "WHERE -> SELECT -> FROM -> ORDER BY", "ORDER BY -> SELECT -> FROM" ], correct: 1, explanation: "SQL evaluates the data source first (FROM/JOIN), then filters rows (WHERE), groups them (GROUP BY), filters groups (HAVING), calculates projections (SELECT/DISTINCT), and finally sorts (ORDER BY) and limits (LIMIT)." },
          { question: "Why does `WHERE amount > AVG(amount)` fail in standard SQL?", options: ["AVG is an aggregate function that cannot be evaluated in the WHERE clause because row-level filtering occurs before group aggregations are calculated.", "AVG only works on integers.", "SQL does not allow greater-than signs.", "It works fine." ], correct: 0, explanation: "WHERE executes before aggregations exist; to compare against an average, you must use a subquery or CTE." },
          { question: "What is the primary difference between a Calculated Column and a DAX Measure in Power BI?", options: ["Calculated columns are computed during data refresh and stored in RAM consuming file size; DAX Measures are computed dynamically on-the-fly at visual render time consuming zero storage.", "Calculated columns are always faster.", "Measures only work on dates.", "There is no difference." ], correct: 0, explanation: "Calculated columns consume memory and disk space; measures are computed dynamically based on active filter contexts." },
          { question: "In a live SQL coding interview, what should be your first action after hearing the problem statement?", options: ["Start typing code immediately as fast as possible.", "Ask clarifying questions about table schemas, data types, null handling, and expected edge-case behavior.", "Ask the interviewer for the answer.", "Close the laptop." ], correct: 1, explanation: "Asking clarifying questions demonstrates seniority, thoroughness, and business requirements discipline." },
          { question: "Which HTTP status code should an API return when a client tries to access a protected resource without providing an authorization token?", options: ["200 OK", "401 Unauthorized", "404 Not Found", "500 Internal Server Error" ], correct: 1, explanation: "401 Unauthorized explicitly indicates that authentication credentials are missing or invalid." }
        ],
        scenarios: [
          { question: "If an interviewer asks you to write a SQL query and you get stuck or make a syntax error, how do you handle it?", solution: "I stay calm and communicate aloud: 'Let's see: the error indicates an issue in my HAVING clause. Ah, I see that I used a column alias that isn't recognized in the aggregation phase yet. Let me replace the alias with the underlying aggregate expression `COUNT(DISTINCT user_id)`. Let's re-run that... excellent, now the group filter produces the expected 42 rows.' Interviewers value real-time problem solving over perfection." },
          { question: "How do you explain the difference between UNION and UNION ALL to a technical interviewer?", solution: "UNION combines the result sets of two queries and performs an automatic deduplication pass across all columns, which requires a sorting operation that is computationally expensive on large tables. UNION ALL simply appends the rows without checking for duplicates, making it significantly faster. I always default to UNION ALL unless unique deduplication is explicitly required by the business logic." },
          { question: "How does explaining technical concepts with business context distinguish you from other technical candidates?", solution: "When an engineer asks about `LEFT JOIN`, most candidates say 'it keeps all rows from table A and matched rows from B'. A strong BA candidate adds: 'In our FinTech capstone, we used a LEFT JOIN from `dim_users` to `fact_transactions` specifically to audit users who signed up but never executed an investment, allowing growth marketing to target them with an onboarding incentive.' This bridges code directly to business revenue." }
        ],
        miniAssignment: "Write the SQL query to find the second highest salary from an `employees` table without using `LIMIT 1 OFFSET 1`."
      }
    },

    // DAY 59
    {
      day: 59, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Product & Business Analyst Mock Interview Simulation: Agile, Prioritization & Stakeholders",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Master the STAR method (Situation, Task, Action, Result) for behavioral, leadership, and conflict resolution interview questions.",
        "Practice feature prioritization frameworks: MoSCoW, RICE (Reach, Impact, Confidence, Effort), and Kano Model.",
        "Simulate handling conflicting stakeholder demands, sprint scope creep, and production severity-1 incidents.",
        "Conduct Root Cause Analysis (RCA) using the 5-Whys framework on a real-world FinTech failure scenario."
      ],
      prerequisites: "Agile BA principles, sprint coordination experience, and Capstone BRD.",
      expectedOutcome: "A comprehensive behavioral interview playbook with 8 polished STAR stories and mastery of product trade-off frameworks.",
      topics: [
        {
          concept: "The STAR Behavioral Interview Framework",
          what: "A structured storytelling method: Situation (Context, business stakes) -> Task (Your specific ownership) -> Action (What you did, frameworks applied) -> Result (Quantifiable business outcome, lessons learned).",
          why: "Behavioral questions ('Tell me about a time you handled a difficult stakeholder') decide whether a hiring manager wants to work with you daily.",
          how: "Time allocation: Situation: 20%, Task: 10%, Action: 50% (highlighting your personal leadership), Result: 20% (quantified with numbers, savings, or velocity improvements).",
          example: "'At my fintech company, our payment gateway failure rate rose to 6.2% during month-end debits... I took ownership of root cause analysis... I ran SQL queries, identified the 2-4 AM bank maintenance window, and authored a smart-routing BRD... As a result, we recovered ₹48 Lakhs in GMV and cut customer support tickets by 34%.'",
          businessCase: "Standard evaluation framework at global technology companies (Amazon, Microsoft, Google, FinTech startups).",
          pitfalls: "Using 'We' instead of 'I', leaving the interviewer unclear on your individual contribution."
        },
        {
          concept: "Agile Prioritization Frameworks (RICE & MoSCoW)",
          what: "Quantitative and qualitative frameworks used by Product and Business Analysts to decide which features get built in upcoming sprints.",
          why: "Stakeholders always demand 50 features at once; analysts must objectively defend trade-offs without making enemies.",
          how: "RICE Score = `(Reach * Impact * Confidence) / Effort`. Reach = number of users affected; Impact = scale 0.5 (low) to 3 (massive); Confidence = percentage (80%, 100%); Effort = person-weeks of engineering time.",
          example: "Feature A (Smart Retry Engine): Reach 15,000, Impact 3, Conf 90%, Effort 4 -> RICE = `(15000 * 3 * 0.9) / 4 = 10,125`. Feature B (Dark Mode UI): RICE = 1,200. Feature A clearly takes sprint priority.",
          businessCase: "De-politicizes sprint backlog grooming by replacing subjective opinions with objective mathematical scoring.",
          pitfalls: "Treating RICE scores as unquestionable dogma without considering strategic business constraints."
        },
        {
          concept: "Managing Conflicting Stakeholder Demands & Scope Creep",
          what: "Navigating disagreements between Sales, Operations, Engineering, and Compliance when project priorities clash.",
          why: "The primary daily test of a Business Analyst's diplomatic and strategic communication skills.",
          how: "The Alignment Process: 1. Listen actively to uncover underlying business goals; 2. Frame decisions around shared company North Star metrics; 3. Use data (SQL/analytics) as an objective mediator; 4. Propose phased releases (Phase 1 MVP vs Phase 2 enhancements).",
          example: "Marketing wants a 1-click checkout with no KYC; Compliance insists on full Aadhaar verification. BA proposes an automated async background KYC check that allows checkout while verifying documents within 2 minutes.",
          businessCase: "Preserves team trust while delivering compliant, high-converting product features.",
          pitfalls: "Saying 'No' bluntly to a senior executive without offering a viable data-backed alternative."
        }
      ],
      resources: [
        { title: "Mastering the STAR Method for Business Analyst Behavioral Interviews", platform: "Bridging the Gap (Laura Brandenburg)", url: "https://www.youtube.com/results?search_query=Laura+Brandenburg+STAR+Interview+Method", time: "30 mins", covers: "Structuring STAR answers, quantifying results, and common pitfalls." },
        { title: "RICE Scoring & Feature Prioritization for Product Analysts", platform: "Intercom Product Blog", url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/", time: "25 mins", covers: "RICE formula, scoring rubrics, and sprint roadmapping." },
        { title: "How to Answer 'Tell Me About a Time You Disagreed with a Stakeholder'", platform: "Exponent Product Management", url: "https://www.tryexponent.com/blog/behavioral-interview-questions", time: "30 mins", covers: "Diplomacy, conflict resolution frameworks, and executive presence." }
      ],
      timetable: [
        { time: "15 mins", activity: "Framework Review: Review STAR structure and RICE formula." },
        { time: "50 mins", activity: "STAR Story Authoring: Write 4 complete behavioral stories (Conflict, Failure, Ambiguity, Leadership)." },
        { time: "25 mins", activity: "Prioritization Exercise: Calculate RICE scores for 4 competing fintech backlog epics." },
        { time: "30 mins", activity: "Conflict Simulation: Practice responding to scope creep and timeline pressure scenarios." },
        { time: "40 mins", activity: "Business Assignment: Complete `08_BEHAVIORAL_INTERVIEW_PLAYBOOK.md` with 8 polished STAR answers." },
        { time: "20 mins", activity: "Assessment & Knowledge Check: Solve 5 MCQs and 3 BA situational dilemmas." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Calculate RICE Priority Scores for 4 Features",
          problem: "Calculate RICE scores for: Feature 1 (Automated Retry), Feature 2 (Biometric Login), Feature 3 (WhatsApp Notifications), Feature 4 (Multi-language Support).",
          scenario: "Sprint backlog quarterly planning.",
          instructions: "Apply formula `(Reach * Impact * Confidence) / Effort`:\n- F1: Reach 20k, Impact 3, Conf 90%, Effort 3 weeks.\n- F2: Reach 50k, Impact 1, Conf 80%, Effort 5 weeks.\n- F3: Reach 30k, Impact 2, Conf 70%, Effort 2 weeks.\n- F4: Reach 10k, Impact 1, Conf 60%, Effort 6 weeks.",
          expectedOutput: "Ranked list of features with RICE scores.",
          hint: "F1 = (20000 * 3 * 0.9) / 3 = 18,000.",
          solution: "Calculations:\n- F1 (Automated Retry): (20,000 * 3 * 0.90) / 3 = 18,000 [Rank 1]\n- F3 (WhatsApp Notifications): (30,000 * 2 * 0.70) / 2 = 21,000 [Rank 1 - Highest]\n- F2 (Biometric Login): (50,000 * 1 * 0.80) / 5 = 8,000 [Rank 3]\n- F4 (Multi-language): (10,000 * 1 * 0.60) / 6 = 1,000 [Rank 4]\nFinal Priority: F3 (WhatsApp) -> F1 (Smart Retry) -> F2 (Biometric) -> F4 (Multi-language)."
        },
        {
          title: "Guided Exercise 2: Conduct 5-Whys Root Cause Analysis on Gateway Outage",
          problem: "A major payment gateway failed 1,400 SIP debits on the 1st of the month. Conduct a 5-Whys analysis to uncover the systemic root cause.",
          scenario: "Post-incident review meeting.",
          instructions: "Progressively ask 'Why?' 5 times from immediate symptom to underlying organizational process.",
          expectedOutput: "A structured 5-Whys diagnostic chain.",
          hint: "Look past technical timeouts to process and requirement gaps.",
          solution: "Why 1: Why did 1,400 transactions fail? -> Because the payment gateway returned HTTP 504 Gateway Timeout.\nWhy 2: Why did it return 504? -> Because our backend sent 5,000 concurrent requests in 1 second, exceeding the partner bank's rate limit.\nWhy 3: Why were 5,000 requests dispatched at once? -> Because our automated cron job fired all scheduled 1st-of-the-month debits at exactly 09:00:00 AM.\nWhy 4: Why was there no rate-limiting or queuing? -> Because the original user story lacked Non-Functional Requirements (NFRs) for batch throttling.\nWhy 5 (Root Cause): Why were NFRs omitted? -> Because our requirement grooming process didn't include a mandatory technical NFR checklist for third-party integrations.\nCorrective Action: Implement leaky-bucket batch throttling in code and establish a mandatory NFR review step in the BA definition of ready."
        },
        {
          title: "Guided Exercise 3: Script Response to Mid-Sprint Scope Creep",
          problem: "In the middle of a 2-week sprint, a senior Vice President demands that the engineering team drop everything and add an un-scoped 'Crypto Wallet' feature. How do you respond?",
          scenario: "Stakeholder boundary management.",
          instructions: "Demonstrate empathy, protect the sprint commitment, and offer a professional trade-off path.",
          expectedOutput: "A professional, diplomatic spoken response.",
          hint: "Acknowledge value, explain sprint trade-off, schedule immediate grooming.",
          solution: "Response: 'I understand why crypto integration is an exciting market opportunity for the business, and I want to make sure we evaluate it thoroughly. Currently, our engineering team is committed to delivering the Smart-Routing Engine in this sprint, which is projected to recover ₹48 Lakhs in lost monthly GMV. If we pull engineers off that work today, we will miss that revenue milestone. Let’s sit down this afternoon for 30 minutes: I’ll help define the business requirements and RICE score for the crypto feature, and we can present it at Friday’s backlog grooming session to schedule it in the very next sprint cycle.'"
        }
      ],
      assignment: {
        title: "Complete the Behavioral Interview Playbook: `08_BEHAVIORAL_INTERVIEW_PLAYBOOK.md`",
        scenario: "Assemble your personal interview answer bank covering every common behavioral and agile dilemma.",
        deliverable: "1. Create file `08_BEHAVIORAL_INTERVIEW_PLAYBOOK.md` in `/docs`.\n2. Write 8 complete STAR stories: 1) Handling a difficult stakeholder; 2) Overcoming a technical mistake; 3) Prioritizing when everything is urgent; 4) Managing scope creep; 5) Translating technical findings for executives; 6) Leading without authority; 7) Diagnosing a root cause with data; 8) Delivering under a tight deadline.\n3. Format each story with clear bold headers: **Situation**, **Task**, **Action**, **Result**.",
        completionCriteria: "Complete playbook with 8 distinct, authentic STAR stories containing quantified results."
      },
      assessment: {
        mcqs: [
          { question: "In the STAR interview method, which section should receive the greatest portion of your speaking time (~50%)?", options: ["Situation", "Task", "Action (the specific leadership and analytical steps you personally executed)", "Result" ], correct: 2, explanation: "Action is where you demonstrate your specific skills, critical thinking, and leadership; it should comprise roughly half your answer." },
          { question: "What is the primary danger of using 'We' exclusively throughout your interview answers?", options: ["It makes answers too long.", "The interviewer cannot determine what you personally accomplished versus what the rest of the team did, weakening your candidacy.", "It sounds impolite.", "Grammar checkers reject it." ], correct: 1, explanation: "Interviewers evaluate YOU. Using 'I took ownership of...', 'I authored...', and 'I analyzed...' clarifies your direct contribution." },
          { question: "In the RICE prioritization formula, how is the score calculated?", options: ["(Reach + Impact) / (Confidence + Effort)", "(Reach * Impact * Confidence) / Effort", "Effort * Impact / Reach", "Reach / Effort" ], correct: 1, explanation: "RICE = (Reach * Impact * Confidence) / Effort, balancing customer reach and business impact against team effort." },
          { question: "What is the 5-Whys technique primarily used for?", options: ["Writing automated SQL tests.", "Drilling down through surface-level symptoms to discover the underlying root cause of an operational or systemic failure.", "Asking for salary raises.", "Sorting spreadsheet columns." ], correct: 1, explanation: "Developed at Toyota, the 5-Whys framework systematically uncovers root causes by asking 'why' iteratively." },
          { question: "In Scrum, what is the role of the 'Definition of Done' (DoD)?", options: ["The date the company goes out of business.", "A formal, agreed-upon checklist of quality standards that a user story must satisfy (code review, testing, documentation) before being considered complete.", "The employee's exit interview.", "The daily standup end time." ], correct: 1, explanation: "The Definition of Done guarantees quality and consensus, preventing partially completed work from being shipped." }
        ],
        scenarios: [
          { question: "If an interviewer asks: 'Tell me about a time you made a mistake on the job. What happened?' How do you answer safely?", solution: "I share an authentic, operational learning experience: early in my BA journey, I once authored a user story that specified a report without clarifying timezone requirements. Transactions between 11 PM and midnight were attributed to the next day, causing a temporary reconciliation variance. As soon as I discovered it, I took ownership: I worked with the developer to standardize all database queries to UTC, updated our team's BRD template to include a mandatory 'Timezone Handling' section, and shared the finding at our sprint retrospective. The mistake became a permanent quality enhancement for the entire department." },
          { question: "How do you explain the difference between a Product Analyst and a Business Analyst?", solution: "While both roles rely on data and requirements, their core focus differs: A Business Analyst primarily focuses on business processes, operational efficiency, stakeholder alignment, and translating business needs into technical specifications (BRDs, user stories). A Product Analyst primarily focuses on product performance, user behavior, feature adoption, funnel conversion, and experimentation (A/B testing, cohort retention) to drive product growth." },
          { question: "Why is practicing your STAR stories aloud so critical before a real interview?", solution: "Thinking about a story in your head feels smooth, but speaking aloud reveals awkward phrasing, rambling timelines, and missing metrics. Rehearsing aloud trains your brain to adhere strictly to the 2-minute time limit, project executive confidence, and hit your quantified results naturally without stuttering." }
        ],
        miniAssignment: "Identify the single biggest professional accomplishment of your career so far and write down its 4 STAR components in bullet points."
      }
    },

    // DAY 60
    {
      day: 60, phase: "Portfolio & Interviews", phaseId: 4,
      title: "Final Capstone Comprehensive Evaluation & 3-Way Career Rubric",
      difficulty: "Advanced", duration: 180,
      objectives: [
        "Complete the 60-Day Grand Capstone Certification Assessment consolidating all 5 learning phases.",
        "Execute the 3-Way Career Evaluation Matrix comparing Business Analyst vs Product Analyst vs Business Analytics paths.",
        "Establish your personalized 90-day post-program action plan for job search, networking, and interview applications.",
        "Formulate your multi-year strategy toward pursuing a Master's Degree abroad in 2028."
      ],
      prerequisites: "Days 1 through 59 (Complete curriculum across all 5 phases).",
      expectedOutcome: "Official program completion certification, quantified 3-way career fit assessment, and a clear execution roadmap for your next role and 2028 Master's degree.",
      topics: [
        {
          concept: "The 3-Way Career Transition Matrix",
          what: "A rigorous 10-dimension evaluation rubric comparing: 1. Business Analyst (BA); 2. Product Analyst (PA); 3. Business Analytics (Analytics Specialist).",
          why: "Understanding which career track best leverages your unique strengths (Agile processes vs Product experimentation vs Deep SQL/BI modeling) maximizes career velocity and compensation.",
          how: "Evaluate 10 core dimensions: 1. Daily Core Ownership; 2. Technical Stack Depth; 3. Stakeholder Ecosystem; 4. Agile Sprint Involvement; 5. Business Impact Measurement; 6. Average Salary Range (India & Global); 7. Career Progression to 2028; 8. Synergy with Master's Degree Abroad; 9. Interview Assessment Focus; 10. Daily Work Satisfaction.",
          example: "Scoring: If you love user stories, sprint grooming, and stakeholder alignment -> Business Analyst; If you love user funnels, A/B testing, and retention curves -> Product Analyst; If you love complex SQL CTEs, data warehousing, and Power BI DAX -> Business Analytics.",
          businessCase: "Provides total clarity for targeted resume submissions rather than spraying generic applications.",
          pitfalls: "Applying to 200 random jobs with the same generic resume without tailoring your narrative to the specific role profile."
        },
        {
          concept: "The 90-Day Job Transition Execution Funnel",
          what: "A structured, week-by-week execution plan governing your active job hunt following program completion.",
          why: "Upskilling without an organized job application strategy leads to lost momentum and fading motivation.",
          how: "Weeks 1-2: Portfolio & Profile Polish (Commit all GitHub repos, verify live links, update LinkedIn headline & About); Weeks 3-4: Targeted Networking (Reach out to 5 BA/Product hiring managers daily with personalized notes); Weeks 5-8: Active Interview Pipeline (Target 3-5 technical screen calls per week, rehearse mock interviews); Weeks 9-12: Offer Evaluation & Salary Negotiation (Negotiate based on market benchmarks and technical versatility).",
          example: "Tracking outreach in a dedicated Notion/Excel application tracker with columns: Company, Role, Referral Contact, Application Date, Stage, Follow-up Date.",
          businessCase: "Systematizes your job transition like a professional sales pipeline.",
          pitfalls: "Relying solely on 1-click 'Easy Apply' buttons on LinkedIn without sending personalized messages or finding employee referrals."
        },
        {
          concept: "The Multi-Year Roadmap: From Senior Analyst to 2028 Master's Abroad",
          what: "A strategic 24-month roadmap connecting your next high-impact analyst role to an elite Master's degree abroad in 2028 (e.g. Master of Science in Business Analytics, Information Systems, or Engineering Management in the US, Germany, or UK).",
          why: "Top universities evaluate work experience quality, technical projects, leadership in agile environments, and analytical depth.",
          how: "2026-2027: Deliver quantified business impact in your new role, earn rapid promotion, build your professional savings target; 2027: Take GRE/GMAT and IELTS/TOEFL, identify target universities and faculty; Early 2028: Submit stellar SOPs highlighting your FinTech portfolio capstones and professional impact -> Fall 2028: Begin Master's degree abroad.",
          example: "Your Capstone Project (FinTech SIP Analytics & BRD) serves as the exact real-world case study for your university Statement of Purpose (SOP).",
          businessCase: "Positions your daily professional work as direct preparation for international academic and career success.",
          pitfalls: "Viewing work experience and master's preparation as disconnected rather than mutually reinforcing."
        }
      ],
      resources: [
        { title: "Business Analyst vs Product Analyst vs Data Analyst (Career Guide)", platform: "Alex The Analyst", url: "https://www.youtube.com/results?search_query=Alex+The+Analyst+Business+Analyst+vs+Data+Analyst+Career", time: "30 mins", covers: "Salary comparisons, daily responsibilities, and transition strategies." },
        { title: "Master of Science in Business Analytics (MSBA) Abroad Guide", platform: "Poets & Quants Guide", url: "https://poetsandquants.com/specialty-masters/ms-in-business-analytics/", time: "35 mins", covers: "Top programs, admission requirements, career outcomes, and ROI." },
        { title: "Salary Negotiation for Tech & Business Analysts", platform: "Levels.fyi & Tech Interview Handbook", url: "https://www.levels.fyi/", time: "25 mins", covers: "Understanding compensation packages, counter-offers, and market benchmarks." }
      ],
      timetable: [
        { time: "15 mins", activity: "60-Day Milestone Celebration: Reflect on your journey from day 1 to day 60." },
        { time: "50 mins", activity: "3-Way Career Rubric Self-Scoring: Complete the 10-dimension evaluation matrix." },
        { time: "25 mins", activity: "Master's 2028 Strategy Blueprint: Map target universities, prerequisites, and timeline." },
        { time: "30 mins", activity: "90-Day Execution Plan: Set up your job search tracking pipeline and outreach templates." },
        { time: "40 mins", activity: "Grand Capstone Assessment: Complete comprehensive 25-question final certification exam." },
        { time: "20 mins", activity: "Final Portfolio Sign-Off: Export complete portfolio certificate and celebrate completion." }
      ],
      exercises: [
        {
          title: "Guided Exercise 1: Execute the 3-Way Career Self-Assessment",
          problem: "Score yourself from 1 to 5 across 6 core preferences: 1) Requirements & Agile coordination; 2) User behavior & Product experimentation; 3) Deep SQL querying & Data pipelines; 4) Executive stakeholder presentations; 5) Building dashboards; 6) Writing BRD/PRD specifications.",
          scenario: "Strategic career direction decision.",
          instructions: "Tally your scores in: Track A (Business Analyst: items 1, 4, 6); Track B (Product Analyst: items 2, 4, 6); Track C (Business Analytics: items 3, 4, 5).",
          expectedOutput: "Clear point ranking showing your primary and secondary career fits.",
          hint: "Be completely honest about what energized you the most over the last 60 days.",
          solution: "Scoring Matrix:\n- If Track A > Track B & C: Primary Target = Technical Business Analyst. Focus applications on FinTech and enterprise software companies.\n- If Track B > Track A & C: Primary Target = Product Analyst. Focus applications on consumer tech, e-commerce, and high-growth apps.\n- If Track C > Track A & B: Primary Target = Business Analytics / BI Analyst. Focus on consulting, analytics centers of excellence, and data teams.\nRecommended Hybrid Strategy: Apply to both Technical BA and Product Analyst roles using customized resume variations for each."
        },
        {
          title: "Guided Exercise 2: Draft Your Cold Outreach Recruiter Message",
          problem: "Write a high-converting 75-word LinkedIn outreach message to send to hiring managers or senior BAs at your target companies.",
          scenario: "Inbound networking funnel.",
          instructions: "Include: Personal connection, concise value proposition, specific portfolio proof point, and low-friction call to action.",
          expectedOutput: "A crisp, professional outreach template.",
          hint: "Avoid asking for a job directly; ask for 10 minutes of advice or feedback on your project.",
          solution: "Subject/Opening: 'Hi [Name], loved your recent post on [Company]’s product expansion!'\nBody: 'I’m a Business Analyst with FinTech experience who recently built an end-to-end Operations Analytics & BRD project analyzing ₹18.5 Cr in SIP investments, recovering ₹48L in lost volume via smart routing. Given your leadership at [Company], I’d love to ask: what is the single most important quality you look for in a Technical BA on your team? Appreciate your time! - [Your Name]'"
        },
        {
          title: "Guided Exercise 3: Master's Degree 2028 Milestone Checklist",
          problem: "Construct a 4-milestone roadmap for your Master's degree abroad in 2028.",
          scenario: "Multi-year educational planning.",
          instructions: "Map out key milestones across: 2026, 2027, Early 2028, and Fall 2028.",
          expectedOutput: "A structured 4-step multi-year timeline.",
          hint: "Balance professional achievements, test scores, and application deadlines.",
          solution: "- Phase 1 (Nov 2026 - Dec 2027): Excel in new Technical BA/Product Analyst role; lead high-impact features; save ₹10-15 Lakhs toward tuition/living fund.\n- Phase 2 (Jan 2027 - Aug 2027): Complete GRE/GMAT preparation (target 320+ / 680+); take IELTS (target 7.5+); shortlist 8 top MSBA/MIS programs in US/Europe.\n- Phase 3 (Sep 2027 - Jan 2028): Draft Statement of Purpose (SOP) centered around FinTech data analytics and career vision; secure 3 stellar recommendation letters; submit applications.\n- Phase 4 (Feb 2028 - Aug 2028): Evaluate admission offers and scholarship packages; secure student visa; relocate abroad to begin Master's program in Fall 2028."
        }
      ],
      assignment: {
        title: "Publish 90-Day Transition Strategy & Final Capstone Portfolio Certificate",
        scenario: "The culmination of your 60-day, 180-hour technical journey.",
        deliverable: "1. Create master document `09_CAREER_TRANSITION_ROADMAP.md` in `/docs`.\n2. Include: 3-Way Career Self-Assessment results, 90-Day Application Tracker blueprint, LinkedIn Outreach templates, Salary Negotiation strategy, and 2028 Master's Degree timeline.\n3. Verify all 60 dashboard module checkmarks and certifications.\n4. Take pride in the massive technical leap you have made over these 60 days.",
        completionCriteria: "Complete roadmap document and 100% completion logged across all 60 days of the technical journey."
      },
      assessment: {
        mcqs: [
          { question: "What is the single most effective job search strategy for mid-level technical and business roles?", options: ["Submitting 500 identical resumes via 1-click apply buttons.", "Building a targeted list of 30 companies, connecting with employees/hiring managers on LinkedIn, sharing your verified portfolio, and securing internal employee referrals.", "Waiting for recruiters to email you without updating your profile.", "Applying only to jobs posted in newspapers." ], correct: 1, explanation: "Employee referrals account for over 40% of all hires and convert to interviews at 10x the rate of cold online job board applications." },
          { question: "When an interviewer asks: 'What are your salary expectations?', what is the most strategic initial response?", options: ["State the lowest number possible so they like you.", "State a ridiculously high number.", "Anchor to market research: 'Based on my research for a Technical BA with hands-on SQL, Power BI, and FinTech domain experience, the competitive market range is ₹X to ₹Y. However, my primary focus is finding the right team fit where I can deliver measurable impact.'", "Refuse to speak." ], correct: 2, explanation: "Anchoring to objective market data demonstrates commercial maturity, protects your value, and invites constructive negotiation." },
          { question: "How does having a documented portfolio of SQL, Power BI, and BRD projects help your application for a Master's degree abroad?", options: ["Universities do not look at projects.", "Admissions committees for competitive MSBA/MIS programs prioritize applicants with proven real-world technical skills, concrete case studies, and clear career trajectories over purely academic scores.", "It exempts you from tuition fees.", "It replaces the need for a passport." ], correct: 1, explanation: "Top graduate programs actively seek professionals who can connect classroom theory to real industry applications." },
          { question: "What should you do if an interviewer challenges one of your portfolio project design decisions during an interview?", options: ["Argue aggressively with them.", "Welcome the critique, explain your original business rationale and constraints, discuss the alternative they suggested, and highlight what you would do in version 2.", "Start crying.", "Leave the interview." ], correct: 1, explanation: "Welcoming technical critique calmly proves collaborative maturity, openness to feedback, and senior engineering mindset." },
          { question: "Over the last 60 days and 180 hours, what is the most significant competitive advantage you have built?", options: ["You memorized some syntax.", "You transformed from a candidate with only administrative requirement knowledge into a complete, commercially-minded Technical Business Analyst who can bridge business strategy, deep data analytics, and software engineering.", "You collected certificates.", "You learned how to use a computer." ], correct: 1, explanation: "The rare ability to bridge deep data querying, executive dashboards, and enterprise agile requirements makes you an exceptionally high-value candidate." }
        ],
        scenarios: [
          { question: "In your upcoming job interviews, how will you address your transition if asked about your current job status?", solution: "I will speak with proactive confidence: 'In my current role, I saw that the future of business analysis belongs to professionals who can get their hands dirty with data and technical architecture. Rather than remaining comfortable, I took complete ownership of my professional development over the last few months—mastering advanced relational SQL, star schema DAX modeling, Postman API testing, and enterprise BRD authoring through real-world FinTech capstones. I am now seeking a dynamic team where I can deploy this combined business and technical toolkit to drive measurable revenue impact.'" },
          { question: "What is your daily routine starting tomorrow (Day 61 onwards) to maintain your technical edge until you land your offer?", solution: "I will maintain a dedicated 1-hour daily habit: 20 minutes solving 1 advanced SQL problem on LeetCode/HackerRank, 20 minutes sending 3 targeted LinkedIn outreach messages with my portfolio link, and 20 minutes reading fintech engineering blogs (Razorpay, Stripe) or reviewing my behavioral STAR stories. Consistency preserves momentum." },
          { question: "Looking ahead to your Master's degree abroad in 2028, how will this 60-day journey serve as the foundation of your international career?", solution: "This program proved to me that I can master any complex technical discipline through structured, deliberate practice. In my upcoming role, I will turn this technical foundation into documented commercial achievements. When I apply to elite international graduate programs in 2027, my Statement of Purpose will not be theoretical—it will showcase a proven track record of solving real business problems with data, setting me up for global leadership in analytics and technology management." }
        ],
        miniAssignment: "Write down your target salary, your target job title, and the exact date by which you intend to sign your next offer letter."
      }
    }

  ],
  weeklyAssessments: [
    {
      week: 1, day: 7, title: "Weekly Assessment 1: Excel Fundamentals, Formulas & Logic",
      passingScore: 75,
      questions: [
        { question: "What is the primary difference between relative ($A1) and absolute ($A$1) cell references?", options: ["Absolute references adjust when copied; relative stay fixed.", "Relative references adjust based on relative position; absolute stay permanently locked.", "Relative references are faster.", "There is no difference."], correct: 1, explanation: "Relative references shift rows/columns when formulas are pasted elsewhere; absolute references remain permanently locked." },
        { question: "If cell A1 contains 1,500.455, what will =ROUND(A1, 2) return?", options: ["1500.45", "1500.46", "1500", "1500.5"], correct: 1, explanation: "The 3rd decimal digit is 5, so ROUND rounds up to 1500.46." },
        { question: "Which function should be used to count non-empty cells containing either text or numbers?", options: ["COUNT()", "COUNTA()", "COUNTBLANK()", "COUNTIF()"], correct: 1, explanation: "COUNTA tallies any populated cell, regardless of whether it holds numbers, strings, or errors." },
        { question: "In XLOOKUP, what is the default match mode if the match_mode parameter is omitted?", options: ["Approximate match (1)", "Exact match (0)", "Wildcard match (2)", "Binary search (-2)"], correct: 1, explanation: "Unlike VLOOKUP which defaulted dangerously to approximate match, XLOOKUP defaults safely to exact match (0)." },
        { question: "Why is converting a flat CSV range into a formal Excel Table (Ctrl+T) recommended before writing formulas?", options: ["It reduces file size by 90%.", "It enables dynamic structured references (e.g. tbl_Txns[Amount]) that automatically include new appended rows.", "It encrypts the spreadsheet.", "It deletes duplicate rows automatically."], correct: 1, explanation: "Excel tables automatically expand formula ranges when new records are appended, preventing broken ranges." }
      ]
    },
    {
      week: 2, day: 14, title: "Weekly Assessment 2: Advanced Excel Modeling & Intro to SQL",
      passingScore: 75,
      questions: [
        { question: "In a Pivot Table, what happens when you place a date field into the 'Rows' area in modern Excel?", options: ["It crashes Excel.", "Excel automatically creates grouping hierarchies (Years, Quarters, Months).", "It converts dates to numbers.", "It sorts in reverse order."], correct: 1, explanation: "Modern Excel automatically generates Date Grouping hierarchies for multi-level time analysis." },
        { question: "What does the SQL command SELECT DISTINCT category FROM mutual_funds do?", options: ["Returns all categories including duplicates.", "Returns only the unique, deduplicated category names from the table.", "Sorts categories in ascending order.", "Counts total categories."], correct: 1, explanation: "DISTINCT collapses identical row values, returning only unique occurrences." },
        { question: "Which SQL operator is used to search for a specific pattern inside a text string?", options: ["IN", "LIKE", "BETWEEN", "CONTAINS"], correct: 1, explanation: "The LIKE operator evaluates wildcard pattern matches using % and _." },
        { question: "What is the result of any equality comparison with NULL in SQL (e.g. `WHERE status = NULL`)?", options: ["TRUE", "FALSE", "UNKNOWN / NULL (fails to return rows)", "Syntax Error"], correct: 2, explanation: "NULL represents unknown; direct equality returns UNKNOWN. You must use IS NULL or IS NOT NULL." },
        { question: "Why is DECIMAL(12,2) preferred over FLOAT for financial transaction amounts in SQL?", options: ["FLOAT cannot store positive numbers.", "FLOAT uses binary floating-point representation which causes fractional rounding discrepancies.", "DECIMAL is faster to compute.", "FLOAT requires more disk space."], correct: 1, explanation: "DECIMAL stores exact fixed-point decimals, preventing fractional penny errors." }
      ]
    },
    {
      week: 3, day: 21, title: "Weekly Assessment 3: Intermediate SQL & Aggregations",
      passingScore: 75,
      questions: [
        { question: "What is the fundamental difference between WHERE and HAVING in SQL?", options: ["WHERE is faster than HAVING.", "WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY.", "HAVING is deprecated.", "WHERE only works on numbers."], correct: 1, explanation: "WHERE executes before aggregations; HAVING filters groups after aggregate calculations." },
        { question: "What does an INNER JOIN between Users and Mandates return?", options: ["All users, even those with no mandates.", "Only users who have at least one matching mandate in the mandates table.", "All mandates, even without users.", "A Cartesian product of all rows."], correct: 1, explanation: "INNER JOIN preserves only rows that satisfy the matching join predicate in both tables." },
        { question: "How does a LEFT JOIN behave if a customer record has no corresponding transactions in the right table?", options: ["The customer record is dropped from output.", "The customer record is preserved, and all transaction columns display NULL.", "An error is thrown.", "The query runs forever."], correct: 1, explanation: "LEFT JOIN retains every record from the left table, filling missing right-side attributes with NULL." },
        { question: "In a CASE statement, what happens if no WHEN condition matches and there is no ELSE clause?", options: ["An error is thrown.", "The expression evaluates to NULL.", "It returns 0.", "It repeats the first condition."], correct: 1, explanation: "If no branch matches and ELSE is omitted, SQL defaults to returning NULL." },
        { question: "What is a Common Table Expression (CTE) in SQL?", options: ["A permanent database table created on disk.", "A temporary, named result set defined using the WITH keyword that exists only for the duration of the query.", "A stored procedure.", "A database index."], correct: 1, explanation: "CTEs provide modular, readable temporary query blocks that make complex logic easy to inspect and maintain." }
      ]
    },
    {
      week: 4, day: 28, title: "Weekly Assessment 4: Advanced SQL & Power BI Setup",
      passingScore: 75,
      questions: [
        { question: "What is the primary difference between `RANK()` and `DENSE_RANK()` window functions?", options: ["RANK only works on numbers.", "RANK skips subsequent rank numbers after ties (1, 1, 3); DENSE_RANK assigns continuous numbers (1, 1, 2).", "DENSE_RANK is slower.", "RANK cannot be partitioned."], correct: 1, explanation: "RANK skips ranks after duplicate ties; DENSE_RANK maintains unbroken rank numbering." },
        { question: "Which window function allows you to retrieve the previous row's value within a partition?", options: ["LEAD()", "LAG()", "FIRST_VALUE()", "PRIOR()"], correct: 1, explanation: "LAG() looks backward by an offset (default 1) within the current partition." },
        { question: "What is the primary architectural purpose of a Star Schema in Power BI?", options: ["To make the diagram look like a star.", "To optimize analytical query performance, simplify DAX calculations, and separate dimensions from high-volume facts.", "To reduce monitor resolution.", "To support web browsers."], correct: 1, explanation: "Star schemas provide optimal performance and intuitive calculation context in columnar analytical databases." },
        { question: "In Power BI data modeling, what is the recommended relationship cardinality and filter direction?", options: ["Many-to-Many with bidirectional filtering.", "1-to-Many with Single filter direction pointing from Dimension to Fact table.", "1-to-1 with both directions.", "No relationships."], correct: 1, explanation: "1-to-Many single-directional filtering avoids circular ambiguity and ensures lightning-fast filter propagation." },
        { question: "What does the VertiPaq engine do in Power BI?", options: ["Renders charts.", "Compresses and stores columnar data in-memory to execute lightning-fast aggregations.", "Connects to Wi-Fi.", "Translates text."], correct: 1, explanation: "VertiPaq is the in-memory columnar database that powers high-performance Power BI analytics." }
      ]
    },
    {
      week: 5, day: 35, title: "Weekly Assessment 5: Power BI DAX & Visual Design",
      passingScore: 75,
      questions: [
        { question: "Why is `DIVIDE(A, B, 0)` preferred over `A / B` in DAX?", options: ["DIVIDE is shorter.", "DIVIDE prevents `#DIV/0!` errors when dividing by zero, returning a safe alternate result.", "DIVIDE formats as percentage automatically.", "Slash operator is not allowed."], correct: 1, explanation: "DIVIDE provides built-in division-by-zero protection, ensuring visuals never crash with unhandled errors." },
        { question: "What is the role of the `CALCULATE` function in DAX?", options: ["Performs basic math.", "Evaluates an expression under a modified filter context, adding, removing, or updating active filters.", "Creates a new column.", "Sorts a visual."], correct: 1, explanation: "CALCULATE modifies the filter context, forming the backbone of all advanced DAX calculations." },
        { question: "What is the primary difference between a Calculated Column and a DAX Measure?", options: ["Calculated columns are computed dynamically at query time; measures are stored on disk.", "Calculated columns are computed during data refresh and consume RAM/disk; measures are computed dynamically on-the-fly consuming zero storage.", "Measures only work in tables.", "There is no difference."], correct: 1, explanation: "Calculated columns consume memory and file space; measures are computed dynamically at runtime." },
        { question: "Why must a contiguous `Dim_Date` table be marked as an official Date Table in Power BI?", options: ["To add calendar icons.", "To disable automatic hidden date hierarchies, optimize performance, and ensure DAX Time Intelligence works reliably.", "To change language to English.", "To export to Excel."], correct: 1, explanation: "Marking as Date Table guarantees accurate evaluation of Time Intelligence functions like DATEADD and TOTALYTD." },
        { question: "In visual design, what is the primary benefit of a 2-page dashboard separating Executive vs Operations views?", options: ["It allows you to use more bright colors.", "It matches report granularity to stakeholder decision horizons: executives see monthly strategic trends; operations teams see daily error diagnostics.", "Power BI only supports 5 visuals per page.", "It reduces computer memory."], correct: 1, explanation: "Role-tailored pages provide immediate clarity for both strategic and tactical decision makers." }
      ]
    },
    {
      week: 6, day: 42, title: "Weekly Assessment 6: REST APIs, JSON & Postman",
      passingScore: 75,
      questions: [
        { question: "Which HTTP method is specifically designed for creating a new resource on a server?", options: ["GET", "POST", "PUT", "DELETE"], correct: 1, explanation: "POST submits data to create a new resource instance on the server." },
        { question: "What does the HTTP status code `422 Unprocessable Entity` communicate?", options: ["Server crashed.", "The request was syntactically valid JSON, but contained semantic or business rule validation errors.", "Resource was deleted.", "Network is down."], correct: 1, explanation: "422 is the standard REST status code for business logic and data validation failures." },
        { question: "In Postman, where should automated test assertion scripts (e.g. `pm.response.to.have.status(200)`) be written?", options: ["In the Headers tab.", "In the Tests tab of the request or collection.", "In the URL parameter bar.", "In the Body tab."], correct: 1, explanation: "Postman executes scripts in the Tests tab immediately after the HTTP response is received." },
        { question: "Why should sensitive API tokens never be hardcoded into request URLs or committed to Git?", options: ["It slows down the internet.", "Exposed tokens can be scraped by automated bots, compromising customer financial data and backend systems.", "URLs do not support letters.", "Git rejects tokens."], correct: 1, explanation: "Hardcoding credentials leads to catastrophic data breaches; use environment variables instead." },
        { question: "What is the role of an Idempotency Key in payment processing APIs?", options: ["To encrypt passwords.", "To ensure that duplicate requests (e.g. customer tapping Pay twice) do not result in duplicate financial debits.", "To make requests faster.", "To format numbers in INR."], correct: 1, explanation: "Idempotency keys protect customers by ensuring duplicate requests execute the transaction only once." }
      ]
    },
    {
      week: 7, day: 49, title: "Weekly Assessment 7: Capstone Project Scoping & Data Architecture",
      passingScore: 75,
      questions: [
        { question: "What is the core business problem addressed in our Capstone FinTech Portfolio Project?", options: ["Website color theme was outdated.", "A 4.8% payment gateway failure rate in recurring SIP investments leaked ₹48 Lakhs in monthly GMV and elevated customer churn.", "Users could not download images.", "The company ran out of mutual funds."], correct: 1, explanation: "The capstone focuses on diagnosing and recovering lost GMV caused by recurring SIP payment failures." },
        { question: "Why is a Data Dictionary an essential deliverable for a Business Analyst?", options: ["To define English words.", "It establishes a single source of truth for column definitions, data types, constraints, and business logic across engineering and business teams.", "It is only required by legal.", "It replaces the need for a database."], correct: 1, explanation: "Data dictionaries prevent ambiguity and ensure all cross-functional partners share identical metric definitions." },
        { question: "What does an e-Mandate represent in Indian digital wealth management?", options: ["An electronic receipt.", "A recurring debit authorization registered with NPCI / banks allowing automated monthly debits up to an approved limit.", "A credit card application.", "A temporary password."], correct: 1, explanation: "e-Mandates enable frictionless recurring mutual fund SIP investments via NPCI's NACH rails." },
        { question: "In a 7-table FinTech schema, why is `fact_retries` kept separate from `fact_transactions`?", options: ["To save disk space.", "To allow granular tracking of recovery conversion funnels across multiple retry attempts without overwriting original transaction history.", "It is required by SQL.", "To confuse competitors."], correct: 1, explanation: "Separating retries allows detailed multi-stage recovery analytics (e.g. Retry #1 vs Retry #2 conversion rates)." },
        { question: "What is Net New Money (NNM) in asset management analytics?", options: ["Fresh currency printed by the Reserve Bank.", "Gross new investment inflows minus redemptions/withdrawals over a given period.", "Total profit earned by the software app.", "Total fees paid to payment gateways."], correct: 1, explanation: "Net New Money measures genuine portfolio growth by subtracting redemption outflows from gross inflows." }
      ]
    },
    {
      week: 8, day: 56, title: "Weekly Assessment 8: End-to-End Capstone, BRD & Portfolio Packaging",
      passingScore: 75,
      questions: [
        { question: "Why is a formal Business Requirement Document (BRD) with Gherkin user stories more impactful in a portfolio than a dashboard alone?", options: ["It makes the portfolio longer.", "It proves you possess enterprise Business Analysis skills: translating data findings into actionable, testable software engineering specifications.", "It is easier to write.", "Dashboards are obsolete."], correct: 1, explanation: "BRDs prove you know how to bridge business strategy, data analytics, and software engineering execution." },
        { question: "In Gherkin acceptance criteria syntax, what do Given, When, and Then specify?", options: ["Past, present, and future tense.", "Given specifies the initial precondition; When specifies the user/system action; Then specifies the testable expected outcome.", "File names in Git.", "Date, time, and author."], correct: 1, explanation: "Given-When-Then structures behavioral test specifications that developers, QA, and business partners can all verify." },
        { question: "What is the primary function of a Requirements Traceability Matrix (RTM)?", options: ["To calculate project cost.", "To map every business requirement to its corresponding SQL query, Power BI visual, and QA test case, ensuring zero requirements are lost.", "To track employee attendance.", "To format markdown files."], correct: 1, explanation: "An RTM guarantees completeness across the entire software development and analytics lifecycle." },
        { question: "In a portfolio `README.md`, where should the quantifiable business impact metrics be placed?", options: ["At the very bottom of the document.", "Right in the header / executive TL;DR callout block at the top of the page.", "Hidden inside code comments.", "In an external PDF only."], correct: 1, explanation: "Busy recruiters and hiring managers spend 30 seconds reviewing a repository; impact metrics must be immediately visible." },
        { question: "What is the recommended duration and structure for an asynchronous video portfolio walkthrough?", options: ["30 minutes of live coding.", "2 to 3 minutes covering Context, Methodology, Core Data Discovery, and Business Solution (BRD).", "10 seconds showing only pictures.", "1 hour of PowerPoint."], correct: 1, explanation: "A crisp 2 to 3 minute narrative highlights business acumen, communication skills, and technical depth without rambling." }
      ]
    }
  ],
  phaseExams: [
    { phaseId: 0, day: 10, title: "Phase 1 Certification Exam: Excel for FinTech & Business Analysis", passingScore: 75, totalQuestions: 20 },
    { phaseId: 1, day: 25, title: "Phase 2 Certification Exam: Production SQL & Relational Analytics", passingScore: 75, totalQuestions: 25 },
    { phaseId: 2, day: 39, title: "Phase 3 Certification Exam: Enterprise Power BI & DAX Modeling", passingScore: 75, totalQuestions: 25 },
    { phaseId: 3, day: 47, title: "Phase 4 Certification Exam: REST APIs, JSON Architecture & Postman", passingScore: 75, totalQuestions: 20 },
    { phaseId: 4, day: 60, title: "Phase 5 Grand Capstone Certification: Technical Business Analyst & Product Analytics", passingScore: 75, totalQuestions: 50 }
  ],
  resourceLibrary: [
    { category: "Excel", title: "Microsoft Excel Help & Training Portal", platform: "Microsoft Learn", url: "https://support.microsoft.com/en-us/excel", desc: "Official Microsoft documentation for formulas, tables, and modeling." },
    { category: "Excel", title: "Leila Gharani - Excel & Business Solutions", platform: "YouTube", url: "https://www.youtube.com/@LeilaGharani", desc: "World-class visual tutorials on dynamic arrays, XLOOKUP, and modern financial reporting." },
    { category: "Excel", title: "ExcelIsFun - High-Performance Analytics", platform: "YouTube", url: "https://www.youtube.com/@ExcelIsFun", desc: "Comprehensive step-by-step masterclasses on spreadsheet logic and finance." },
    { category: "SQL", title: "SQLBolt - Interactive SQL Lessons", platform: "SQLBolt", url: "https://sqlbolt.com/", desc: "Free interactive browser sandbox teaching SELECT, JOINs, aggregations, and subqueries." },
    { category: "SQL", title: "Alex The Analyst - SQL for Data & Business Analysts", platform: "YouTube", url: "https://www.youtube.com/@AlexTheAnalyst", desc: "Industry-standard real-world portfolio projects, queries, and interview question breakdowns." },
    { category: "SQL", title: "PostgreSQL Official Documentation", platform: "PostgreSQL", url: "https://www.postgresql.org/docs/", desc: "The definitive reference manual for enterprise relational database architecture." },
    { category: "Power BI", title: "Microsoft Power BI Documentation & Guided Learning", platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/power-bi/", desc: "Official learning pathways covering Power Query, dimensional modeling, and report publishing." },
    { category: "Power BI", title: "Guy in a Cube - Power BI Mastery", platform: "YouTube", url: "https://www.youtube.com/@GuyInACube", desc: "Tips, tricks, and architectural best practices directly from Microsoft MVPs." },
    { category: "Power BI", title: "SQLBI - The Definitive Guide to DAX", platform: "SQLBI", url: "https://www.sqlbi.com/", desc: "In-depth articles and patterns on filter context, star schemas, and VertiPaq optimization." },
    { category: "APIs", title: "Postman Learning Center", platform: "Postman", url: "https://learning.postman.com/", desc: "Official guides for testing REST APIs, writing automated assertions, and environment variables." },
    { category: "APIs", title: "MDN Web Docs - HTTP Protocols & Status Codes", platform: "Mozilla Developer Network", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", desc: "The definitive standard for client-server communication, headers, and status code taxonomies." },
    { category: "Business Analysis", title: "Bridging the Gap - Laura Brandenburg", platform: "YouTube", url: "https://www.youtube.com/@BridgingTheGapBA", desc: "Practical guidance for Business Analysts: requirements gathering, BRDs, and stakeholder management." },
    { category: "Career & Interviews", title: "Levels.fyi - Tech Compensation Benchmarks", platform: "Levels.fyi", url: "https://www.levels.fyi/", desc: "Verified salary and compensation data across Business Analyst, Product, and Data roles." }
  ],
  interviewQuestionBank: [
    { category: "SQL", question: "What is the true logical execution order of SQL clauses?", answer: "FROM and JOINs execute first to build the working table -> WHERE filters rows -> GROUP BY forms aggregation groups -> HAVING filters aggregated groups -> SELECT projects and calculates expressions -> DISTINCT removes duplicates -> ORDER BY sorts the output -> LIMIT / OFFSET truncates results." },
    { category: "SQL", question: "What is the difference between RANK() and DENSE_RANK()?", answer: "Both assign ranks based on an ORDER BY clause. When duplicate values tie, RANK() skips subsequent rank numbers (e.g. 1, 1, 3), whereas DENSE_RANK() assigns sequential unbroken numbers (e.g. 1, 1, 2)." },
    { category: "SQL", question: "Why is a LEFT JOIN preferred when auditing unactivated customers?", answer: "A LEFT JOIN keeps all customer records from the primary table even if they have zero transactions in the right table. Filtering `WHERE t.txn_id IS NULL` instantly reveals users who signed up but never made a purchase." },
    { category: "Power BI", question: "Explain the difference between Row Context and Filter Context in DAX.", answer: "Row Context is the concept of 'current row' in an iteration (like multiplying columns row-by-row in a calculated column). Filter Context is the ambient environment of active filters from slicers, visuals, and page filters that restrict what data a measure computes." },
    { category: "Power BI", question: "Why should we use Star Schema rather than a single flat table in Power BI?", answer: "Star schema separates descriptive dimensions from high-volume event facts. It optimizes VertiPaq columnar compression, eliminates duplicate text storage, speeds up cross-filtering, and simplifies DAX logic." },
    { category: "Excel", question: "Why is XLOOKUP superior to legacy VLOOKUP?", answer: "XLOOKUP looks in any direction (left and right), defaults to safe exact matches, does not break when columns are inserted, and handles missing values natively without cumbersome IFERROR wrappers." },
    { category: "APIs", question: "What is the difference between a 401 Unauthorized and a 403 Forbidden status code?", answer: "401 indicates that authentication credentials are missing or invalid (the server does not know who you are). 403 indicates that the user is authenticated, but lacks permissions or role authorization to access that resource." },
    { category: "Business Analysis", question: "How do you handle a senior executive who insists on an un-scoped feature mid-sprint?", answer: "I apply empathetic boundary management: acknowledge the business value of their idea, explain the trade-off on current sprint delivery commitments using data/GMV impact, and offer an immediate solution: groom the feature, calculate its RICE score, and schedule it in the upcoming sprint." },
    { category: "Behavioral", question: "Tell me about a time you made a mistake at work and how you handled it.", answer: "Use the STAR method: Describe an authentic operational mistake (e.g. omitting a timezone constraint in a query), explain how you immediately took ownership, collaborated to fix the underlying UTC schema, updated documentation, and established a prevention checklist so the team never repeated it." }
  ],
  careerAssessment: {
    title: "3-Way Career Transition Rubric: Business Analyst vs Product Analyst vs Business Analytics",
    dimensions: [
      { dimension: "Core Daily Ownership", ba: "Translating business goals into technical BRDs, sprint stories, backlog grooming, and stakeholder alignment.", pa: "User engagement analysis, funnel drop-off diagnostics, cohort retention, and feature experimentation (A/B testing).", analytics: "Data modeling, ETL pipeline validation, automated BI reports, and predictive trend modeling." },
      { dimension: "Technical Stack Emphasis", ba: "Advanced Excel, Relational SQL, REST API specs (Postman), Jira/Confluence, Process Mapping.", pa: "SQL, Product Analytics tools (Mixpanel/Amplitude), Python/R (basic), A/B testing frameworks, BI dashboards.", analytics: "Deep SQL, Power BI / Tableau, Data Warehousing (Star Schema), Python/pandas, DAX." },
      { dimension: "Primary Stakeholders", ba: "Business leaders, Engineering leads, Product Managers, QA teams, Operations.", pa: "Product Managers, Growth/Marketing leads, UX Designers, Executive Leadership.", pa_label: "Product Analyst", analytics: "Finance teams, Business Operations leads, Data Engineers, C-suite." },
      { dimension: "Salary Benchmark (India Mid-Level)", ba: "₹9L – ₹16L / year", pa: "₹12L – ₹20L / year", analytics: "₹10L – ₹18L / year" },
      { dimension: "Synergy with 2028 Master's Abroad", ba: "Prepares for MS in Engineering Management (MEM) or MBA programs.", pa: "Prepares for MS in Information Systems (MIS) or Master in Product Management.", analytics: "Prepares directly for Master of Science in Business Analytics (MSBA) or Data Science." },
      { dimension: "Key Interview Test", ba: "BRD authoring, Gherkin user stories, Agile dilemmas, basic-to-intermediate SQL.", pa: "Metric definition, root-cause failure analysis, cohort retention, experimentation cases.", analytics: "Live SQL live-coding, DAX modeling, star schema architecture, statistical evaluation." }
    ]
  }
};
