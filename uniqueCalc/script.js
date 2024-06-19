function calculateCost() {
    const weaponClass = parseInt(document.getElementById('weaponClass').value);
    const attackStrength = parseInt(document.getElementById('attackStrength').value);
    const defenseStrength = parseInt(document.getElementById('defenseStrength').value);
    const hullSize = parseInt(document.getElementById('hullSize').value);
    
    let specialAbilityCost = 0;
    const specialAbilities = document.querySelectorAll('.specialAbility:checked');
    
    if (specialAbilities.length > 2) {
        specialAbilityCost = NaN; // Invalid if more than 2 special abilities are selected
    } else {
        specialAbilities.forEach(ability => {
            specialAbilityCost += parseInt(ability.value);
        });
    }

    const checkboxes = document.querySelectorAll('.specialAbility');

    checkboxes.forEach(checkbox => {
        checkbox.disabled = false; // Reset all checkboxes to be enabled
    });

    // Count how many checkboxes are checked
    const checkedCount = document.querySelectorAll('.specialAbility:checked').length;

    // Disable remaining checkboxes if two are checked
    if (checkedCount >= 2) {
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                checkbox.disabled = true;
            }
        });
    }
    
    let totalCpCost = 0;

    totalCpCost = weaponClass + attackStrength + defenseStrength + hullSize + specialAbilityCost;

    // Check if design weakness was chosen and if the rest of ship cost is 17 or higher
    const weaknessChecked = document.querySelectorAll('#weakness:checked').length;
    if (totalCpCost >= 16 && weaknessChecked > 0) {
        totalCpCost -= 1
    }
    
    let shipSize;
    if (totalCpCost <= 6) {
        shipSize = 1;
    } else if (totalCpCost <= 9) {
        shipSize = 2;
    } else if (totalCpCost <= 12) {
        shipSize = 3;
    } else if (totalCpCost <= 15) {
        shipSize = 4;
    } else if (totalCpCost <= 20) {
        shipSize = 5;
    } else if (totalCpCost <= 24) {
        shipSize = 6;
    } else if (totalCpCost <= 32) {
        shipSize = 7;
    } else {
        shipSize = "Invalid";
    }

    // Apply weapon class restrictions based on total cost
    let isValid = true;
    if (totalCpCost > 9 && totalCpCost <= 20 && weaponClass === 1) {
        isValid = false;
    } else if (totalCpCost > 19 && totalCpCost <= 30 && weaponClass < 3) {
        isValid = false;
    } else if (totalCpCost > 29 && weaponClass < 4) {
        isValid = false;
    }

    if (isValid && specialAbilityCost <= 0 && totalCpCost > 32) {
        isValid = false;
    }

    let invalidReason = "";

    // Apply weapon class restrictions based on total cost
    if (totalCpCost > 32) {
        invalidReason = "Total CP cost exceeds maximum allowed (32 CP).";
    } else if (totalCpCost > 24 && weaponClass < 4) {
        invalidReason = "Ship costs more than 24 CP but does not have at least B class weapon.";
    } else if (totalCpCost > 20 && weaponClass < 3) {
        invalidReason = "Ship costs more than 20 CP but does not have at least C class weapon.";
    } else if (totalCpCost > 10 && totalCpCost <= 20 && weaponClass === 1) {
        invalidReason = "Ship costs more than 10 CP but does not have at least D class weapon.";
    }

    // Check if any special abilities are selected but total CP cost is invalid
    if (specialAbilityCost <= 0 && totalCpCost > 32) {
        invalidReason = "Ship is invalid due to excessive cost.";
    }

    document.getElementById('totalCpCost').textContent = totalCpCost;
    document.getElementById('shipSize').textContent = shipSize;

    if (!isValid || shipSize === "Invalid") {
        document.getElementById('inv-reason').textContent = invalidReason;
        document.getElementById('totalCpCost').classList.add('invalid');
        document.getElementById('shipSize').classList.add('invalid');
    } else {
        document.getElementById('inv-reason').textContent = "";
        document.getElementById('totalCpCost').classList.remove('invalid');
        document.getElementById('shipSize').classList.remove('invalid');
    }
}

// Calculate cost on page load based on default selections
document.addEventListener('DOMContentLoaded', calculateCost);
