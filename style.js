document.getElementById("search-btn").addEventListener("click", function () {
    showWarning(""); // removing warning Text
    document.getElementById("food-details").style.display = 'none';

    const inputFoodName = document.getElementById("input-food-name").value;
    document.getElementById("input-food-name").value = "";
    const foodName = inputFoodName.trim();

    if (foodName === "") {
        showWarning("Please Enter a meal name.")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
            .then(res => res.json())
            .then(data => {

                if (data.meals === null) {
                    showWarning(`No meal found with name \"${foodName}\". Please try again.`)
                } else {
                    console.log(data);
                    processData(data.meals);

                }
            })
    }
})

function processData(meals) {
    document.getElementById("food-list").innerHTML = "";

    meals.forEach(meal => {
        const foodDiv = document.createElement("div");
        foodDiv.innerHTML = `
        <div onclick='mealDetails("${meal.idMeal}")' class="food-card">
            <img src="${meal.strMealThumb}" class="food-image">
            <h5 class="food-title">${meal.strMeal}</h5>
        </div>
        `
        document.getElementById("food-list").appendChild(foodDiv);
    });
}

function mealDetails(mealId) {
    console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            displayMealDetails(data.meals[0]);
        })
}

function displayMealDetails(meal) {
    document.getElementById("food-details-display").innerHTML = `
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="food-details-image">
        <h3 class="food-details-title">${meal.strMeal}</h3>
    </div>
    <div>
        <h4>  Ingredients</h4>
         <ul id="ingredient-list">
        </ul>
    </div>
    `
    document.getElementById("instruction-display").innerHTML = `
    <p class="instructions">${meal.strInstructions}</p>
    `
    console.log(meal);
    for (let i = 1; i <= 20; i++) {
        let ingredient = 'strIngredient' + i;
        let quantity = 'strMeasure' + i;
        if (meal[ingredient] === "" || meal[ingredient] == null) {
            break;
        }
        const li = document.createElement("li");
        li.innerHTML = `
        <li><i class="icon-color fas fa-check-square"></i> ${meal[quantity]} ${meal[ingredient]}</li>
        `;
        document.getElementById("ingredient-list").appendChild(li)
    }
    document.getElementById("food-details").style.display = "block";
    document.getElementById("food-details").scrollIntoView({ behavior: "smooth" });
}


function showWarning(warningText) {
    document.getElementById("warning-text").innerText = warningText;
}
