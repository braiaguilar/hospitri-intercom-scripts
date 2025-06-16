const intercomClient = require('../../utils/intercomClient');

/**
 * Asigns value of a custom attribute to company IDs array
 * @param {Array<string>} companyIds - Array of Intercom Company IDs
 * @param {string} attribute - Custom attribute to set (e.g., 'active')
 * @param {any} value - Value to set for the custom attribute (e.g., true/false)
 * @returns {Promise<Array>} - Array of results indicating success or failure for each company ID
 */
const setAttribute = async (companyIds, attribute, value) => {
    const results = [];
    if (attribute === 'listings') {
        try {
            if (companyIds.length !== value.length) {
                throw new Error(
                    'Company IDs and values arrays must have the same length'
                );
            }
            for (let i = 0; i < companyIds.length; i++) {
                try {
                    await intercomClient.put(
                        `/companies/${companyIds[i]}`,
                        {
                            custom_attributes: {
                                [attribute]: value[i],
                            },
                        }
                    );
                    results.push({ id: companyIds[i], success: true });
                } catch (error) {
                    console.error(
                        `Error setting attribute value for company ${companyIds[i]}:`,
                        error.response?.data || error.message
                    );
                    results.push({ id: companyIds[i], success: false });
                }
            }
        } catch (error) {
            console.error(
                `Error setting listings:`,
                error.response?.data || error.message
            );
        }
    } else {
        for (const id of companyIds) {
            try {
                await intercomClient.put(`/companies/${id}`, {
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
const value = [];

setAttribute(companiesToUpdate, 'listings', value);
