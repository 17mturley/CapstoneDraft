const fridgeSelect = document.querySelector('#fridge-select')
const pantrySelect = document.querySelector('#pantry-select')
const ingredientName = document.querySelector('#ingredient-select')
const recipesSct = document.querySelector('#recipes')
const viewButton = document.querySelector('#view-recipe')
const myRecipes = document.querySelector('#my-recipes')
const selectedPantry = document.querySelector('#selected-ingredients')
const selectedFridge = document.querySelector('#selected-fridge-ingredients')
const selectedRecipesSection = document.querySelector('#selected-recipes')

let selectedRecipes = [];

function getRecipes() {
    recipesSct.innerHTML = ''
    axios.get('http://localhost:5432/recipes/')
        .then(res => {
            res.data.forEach(elem => {
                let recipeCard = `<div class="recipe-card" id="recipe-${elem['recipe_id']}">
                    <h2>${elem.name}</h2>
                    <button onclick="viewRecipe(${elem['recipe_id']})">View</button>
                    <button onclick="addRecipe(${elem['recipe_id']})">Add Recipe</button>
                    </div>`
                recipesSct.innerHTML += recipeCard
            })
        })
}


function addRecipe(recipeId) {
    if (!selectedRecipes.includes(recipeId)) {
    axios.post(`http://localhost:5432/recipes/${recipeId}`, { recipeId })
    .then(res => {
        const selectedRecipeElement = document.createElement('div');
        selectedRecipeElement.textContent = `${res.data.name} Instructions: ${res.data.instructions}`;
        selectedRecipesSection.appendChild(selectedRecipeElement);
        selectedRecipes.push(recipeId);
        const recipeCard = document.getElementById(`recipe-${recipeId}`);
        if (recipeCard) {
            recipeCard.remove();
        }
    })
    .catch(error => {
        console.log('Error adding recipe:', error);
    });
    } else {
        alert('Recipe is already selected!');
    }
}

function removeSelectedRecipe() {
    const lastSelectedRecipeId = selectedRecipes.pop();
    axios.post(`http://localhost:5432/recipes/${recipeId}`, { recipeId: lastSelectedRecipeId })
        .then(res => {
            const recipeCard = document.createElement('div');
            recipeCard.textContent = `${res.data.name} Instructions: ${res.data.instrustions}`;
            recipesSct.appendChild(recipeCard);
            const selectedRecipeElement = document.getElementById(`selected-recipes-${lastSelectedRecipeId}`);
            if (selectedRecipeElement) {
                selectedRecipeElement.remove();
            }
        })
        .catch(error => {
            console.log('Error removing recipe:', error);
        });
}

function getMyRecipes() {
    axios.get('http://localhost:5432/recipes/')
        .then(res => {
            res.data.forEach(elem => {
                

            })
        })
}

function fridgeIng() {
    axios.get('http://localhost:5432/fridge/')
        .then(res => {
            res.data.forEach(ingredient => {
               const option = document.createElement('option')
               option.setAttribute('value', ingredient['ingredient_id'])
               option.textContent = ingredient.name
               fridgeSelect.appendChild(option) 
            });
            fridgeSelect.addEventListener('change', function () {
                const selectedIngredientId = this.value;
                const selectedIngredientName = this.options[this.selectedIndex].text;
                postFridgeIngredient(selectedIngredientId, selectedIngredientName);
            })

        })
}

function postFridgeIngredient(ingredientId, ingredientName) {
    const ingredientElement = document.createElement('div');
    ingredientElement.textContent = `${ingredientName}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function () {
        removeSelectedIngredient(ingredientId, ingredientElement);
    })
    ingredientElement.appendChild(removeButton);
    selectedFridge.appendChild(ingredientElement);
}

function pantryIng() {
    axios.get('http://localhost:5432/pantry/')
        .then(res => {
            res.data.forEach(ingredient => {
                const option = document.createElement('option')
                option.setAttribute('value', ingredient['ingredient_id'])
                option.textContent = ingredient.name
                pantrySelect.appendChild(option) 
             });
            pantrySelect.addEventListener('change', function () {
                const selectedIngredientId = this.value;
                const selectedIngredientName = this.options[this.selectedIndex].text;
                postPantryIngredient(selectedIngredientId, selectedIngredientName);
            });   
        });
}

function postPantryIngredient(ingredientId, ingredientName) {
                const ingredientElement = document.createElement('div');
                ingredientElement.textContent = `${ingredientName}`;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';
                removeButton.addEventListener('click', function () {
                    removeSelectedIngredient(ingredientId, ingredientElement);
                })
                ingredientElement.appendChild(removeButton);
                selectedPantry.appendChild(ingredientElement);
            }
            
function removeSelectedIngredient(ingredientId, elementToRemove) {
    elementToRemove.remove()
}

fridgeIng()
pantryIng()
getRecipes()
seeRecipes.addEventListener('click', getRecipes)