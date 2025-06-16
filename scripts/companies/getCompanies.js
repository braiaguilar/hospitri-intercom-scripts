const intercomClient = require('../../utils/intercomClient');

/**
 * Fetches all companies from Intercom
 * @returns {Promise<Array>} - Array of company objects
 */
const getCompanies = async () => {
    try {
        const { data: companies } = await intercomClient.get('/companies');
        console.log({
            message: `✅ Fetched ${companies.total_count} companies from Intercom.`,
            companies: companies.data.map(company => ({
                id: company.id,
                company_id: company.company_id,
                name: company.name,
                active: company.custom_attributes.active,
                listings: company.custom_attributes.listings,
            })),
        });
        return companies;
    } catch (error) {
        console.error(
            'Error fetching companies:',
            error.response?.data || error.message
        );
        throw error;
    }
};

// Use script
getCompanies();
