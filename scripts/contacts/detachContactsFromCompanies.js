const intercomClient = require('../../utils/intercomClient');
//TODO: Make capable of detaching multiple contacts from multiple companies

/**
 * Detaches contacts from companies in Intercom
 * @param {Array<string>} companyIds - Array of Intercom Company IDs
 * @param {string} contactId - Contact ID to detach from the companies
 * @returns {Promise<void>} - Array of results indicating success or failure for each company ID
 */
const detachContactsFromCompanies = async (companyIds, contactId) => {
    const results = [];

    for (const id of companyIds) {
        try {
            await intercomClient.delete(
                `/contacts/${contactId}/companies/${id}`
            );
            results.push({ id, success: true });
        } catch (error) {
            console.error(
                `Error detaching contact from company ${id}:`,
                error.response?.data || error.message
            );
            results.push({ id, success: false });
        }
    }

    console.log(
        `✅ Complete. ${
            results.filter(r => r.success).length
        } successfully detached.`
    );

    return results;
};

// Use script
const companies = [];
const contact = '';

detachContactsFromCompanies(companies, contact);
