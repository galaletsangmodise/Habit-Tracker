let habits = [];

const habitNameInput = document.getElementById('habit-name');
const targetDaysInput = document.getElementById('target-days');
const categoryInput = document.getElementById('category');
const errorMessage = document.getElementById('error-message');
const addBtn = document.getElementById('add-btn');
const habitsList = document.getElementById('habits-ul');

function validateForm() {
    const name = habitNameInput.value.trim();
    const target = parseInt(targetDaysInput.value);
    const category = categoryInput.value;

    if (name.length < 3) {
        showError('Please enter a habit name.');
        return false;
    }
    if (!Number.isInteger(target) || target > 7) {
        showError('Target must be whole number and less than or equal to 7.');
        return false;
    }
    if (!category) {
        showError('Please select a category.');
        return false;
    }
    hideError();
    return true;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');

}
function hideError() {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
}

function addHabit() {
    if (!validateForm()) return;

    const newHabit = {
        id: Date.now(),
        name: habitNameInput.value.trim(),
        target: parseInt(targetDaysInput.value),
        category: categoryInput.value,
        streak: 0,
        completedToday: false
    };
    habits.push(newHabit);

    habitNameInput.value = '';
    targetDaysInput.value = '';
    categoryInput.value = '';

    renderHabits();
    updateSummary();
}

function renderHabits() {
    habitsList.innerHTML = '';

    if (habits.length === 0) {
        habitsList.innerHTML = '<p style="text-align: center; color: #666;">No habits added yet. Start building your routine!</p>';
        return;
    }   
    habits.forEach(function(habit) {
        const li = document.createElement('li');
        li.dataset.id = habit.id;

        if (habit.completedToday) {
            li.classList.add('completed');
        }   
        li.innerHTML = `
            <input type="checkbox"class="done-checked" ${habit.completedToday ? 'checked' : ''} />
            <span class="habit-name">${habit.name}</span>
            <span class="habit-category">${habit.category}</span>
            <span class="streak">Streak: ${habit.streak} / ${habit.target}</span>
            <button class="delete-btn">Delete</button>
        `;
        habitsList.appendChild(li);
    }); 

    attachListeners();
}

function attachListeners() {

    document.querySelectorAll('.done-checked').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const id = Number(this.closest('li').dataset.id);
            const habit = habits.find(function(h) { return h.id === id; });

            habit.completedToday = this.checked;
            if (this.checked) {
                habit.streak+= 1;
            } else {
                habit.streak -= 1;
                if (habit.streak < 0) habit.streak = 0;
            }

            renderHabits();
            updateSummary();
        });
    }   );

    document.querySelectorAll('.delete-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const id = Number(this.closest('li').dataset.id);
            habits = habits.filter(function(h) { return h.id !== id; });

            renderHabits();
            updateSummary();
        });
    }   );
}

function updateSummary() {
    const total = habits.length;
    const done = habits.filter(function(h) { return h.completedToday; }).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    document.getElementById('total-habits').textContent = 'Total Habits: ' + total;
    document.getElementById('done-today').textContent = 'Done Today: ' + done;
    document.getElementById('completion-pct').textContent = pct + '%';
}

addBtn.addEventListener('click', addHabit);

renderHabits();
updateSummary();