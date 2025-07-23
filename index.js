        document.addEventListener('DOMContentLoaded', function() {
            const exerciseInput = document.getElementById('exercise');
            const setsInput = document.getElementById('sets');
            const repsInput = document.getElementById('reps');
            const detailsInput = document.getElementById('details');
            const submitButton = document.getElementById('button');
            const workoutList = document.getElementById('workout-list');

            function addExercise() {
                const exercise = exerciseInput.value.trim();
                const sets = setsInput.value;
                const reps = repsInput.value;
                const details = detailsInput.value.trim();

                if (!exercise || !sets || !reps) {
                    alert('Please fill in all required fields (Exercise, Sets, and Reps)');
                    return;
                }

                const workoutItem = document.createElement('li');
                workoutItem.className = 'workout-item';
                
                workoutItem.innerHTML = `
                    <h4>${exercise}</h4>
                    <p><strong>Sets:</strong> ${sets} | <strong>Reps:</strong> ${reps}</p>
                    ${details ? `<p><strong>Notes:</strong> ${details}</p>` : ''}
                `;

                workoutList.appendChild(workoutItem);

                // Clear form
                exerciseInput.value = '';
                setsInput.value = '';
                repsInput.value = '';
                detailsInput.value = '';

                // Focus back to exercise input
                exerciseInput.focus();
            }

            submitButton.addEventListener('click', addExercise);

            // Allow Enter key to submit when in input fields
            [exerciseInput, setsInput, repsInput].forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        addExercise();
                    }
                });
            });
        });