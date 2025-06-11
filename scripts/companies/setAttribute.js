const intercomClient = require('../../utils/intercomClient');

/**
 * Asigns value of a custom attribute to company IDs array
 * @param {Array<string>} companyIds - Intercom Companies IDs array
 * @param {string} attribute - Custom attribute to set (e.g., 'active')
 * @param {any} value - Value to set for the custom attribute (e.g., true/false)
 * @returns {Promise<Array>} - Array of results indicating success or failure for each company ID
 */
async function setAttribute(companyIds, attribute, value) {
    const results = [];

    for (const id of companyIds) {
        try {
            const res = await intercomClient.put(`/companies/${id}`, {
                custom_attributes: {
                    [attribute]: value,
                },
            });
            results.push({ id, success: true });
        } catch (error) {
            console.error(
                `Error setting attribute value for company ${id}:`,
                error.response?.data || error.message
            );
            results.push({ id, success: false });
        }
    }

    console.log(
        `✅ Complete. ${
            results.filter(r => r.success).length
        } successfully updated.`
    );

    return results;
}

// Use script
const companiesToUpdate = [];
setAttribute(companiesToUpdate, 'active', false);
