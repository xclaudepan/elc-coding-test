/**
 * This file holds functions that are used in the backend.
 * 
 */

/**
 * Check if a string contains a substring.
 * 
 * @param str [string] - a string;
 * @param substr [string] - a substring;
 * @returns [boolean]
 */
function hasSubStr(str, substr) {
    return str.toLowerCase().includes(substr.toLowerCase());
}

/**
 * Check if a product's name or tags contain the keyword.
 * 
 * @param product [Object] - a product which has name and tags properties;
 * @param keyword [string] - a string of keyword;
 * @returns [boolean]
 */
function hasKeyword(product, keyword) {
    const name = product.name;
    if (name) {
        if (hasSubStr(name, keyword)) {
            return true;
        }
    }
    
    const tags = product.tags;
    if (tags) {
        for (const tag of tags) {
            if (hasSubStr(tag, keyword)) {
                return true;
            }
        }
    }

    return false;
}

module.exports = { hasKeyword }