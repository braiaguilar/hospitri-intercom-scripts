const intercomClient = require('../../utils/intercomClient');

/**
 * Sets contacts to companies in Intercom
 * @param {Array<string>} companyIds - Array of Intercom Company IDs
 * @param {Array<Array<string>>} contacts - Array of contact IDs for each company
 * @returns {Promise<void>} - Array of results indicating success or failure for each company ID
 */
const setContactsToCompanies = async (companyIds, contacts) => {
    const results = [];
    try {
        if (companyIds.length !== contacts.length) {
            throw new Error(
                'Company IDs and contacts arrays must have the same length'
            );
        }
        for (let i = 0; i < companyIds.length; i++) {
            try {
                for (const id of contacts[i]) {
                    await intercomClient.post(`/contacts/${id}/companies`, {
                        id: companyIds[i],
                    });
                }
                results.push({ id: companyIds[i], success: true });
            } catch (error) {
                console.error(
                    `Error updating company ${companyIds[i]} with contacts:`,
                    error.response?.data || error.message
                );
                results.push({ id: companyIds[i], success: false });
            }
        }
    } catch (error) {
        console.error(
            'Error setting contacts to companies:',
            error.response?.data || error.message
        );
        throw error;
    }

    console.log(
        `✅ Complete. ${
            results.filter(r => r.success).length
        } successfully updated.`
    );

    return results;
}

// Use script
const companies = [];
const contacts = [[]];

setContactsToCompanies(companies, contacts);
