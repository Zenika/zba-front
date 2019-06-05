function selectedStepEnum(value) {
    const steps = {
        1: "sanitizing",
        2: "crushing",
        3: "brewing",
        4: "filtering",
        5: "hopping",
        6: "colding",
        7: "leavening",
        8: "density",
        9: "fermenting",
        10: "bottling"
    }
    return steps[value]
}

function steps(recipeSteps) {
    let steps = []
    for(let i = 0; i < recipeSteps.steps.length; i++) {
        const obj1 = { type : selectedStepEnum(recipeSteps.steps[i].selectedStep)}
        const obj2 = recipeSteps.steps[i]
        delete obj2.component
        const obj = Object.assign({}, obj1, obj2);
        steps.push(obj)
    }
    return steps
}

export function jsonRecipe(recipeId, recipe, recipeSteps) {
    let newRecipe = {
        recipe : {
            id: recipeId,
            name: recipe.name,
            ingredientType: recipe.ingredientType,
            malt: recipe.malt,
            creator: recipe.creator
        },
        steps: steps(recipeSteps)
    }
    return newRecipe
}