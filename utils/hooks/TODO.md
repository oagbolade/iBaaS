<!-- We will need a description generator function that generates a description -->

**descriptionGenerator(reportType, queryParameters)**
{reportType} report for:
Start date: 2022-09-20
End date: 2024-09-15
Branch: Eti Osa
Status: Active
Account Number: 00223345

<!-- We will need a ParsePaginatedData function to parse through each page of our endpoint -->

**const {isParsing, parsedData} = usePaginationParser(apiResponse)**
-It returns data from all pages
[
data from page 1
data from page 2
................
data from page 20
]
