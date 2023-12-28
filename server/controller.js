require("dotenv").config()
const {CONNECTION_STRING} = process.env
const Sequelize = require("sequelize")
const {seed} = require("./seed.js")

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    getRecipes: (req, res) => {
        console.log('Megan')
        sequelize.query(`select * from recipes;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    fridgeIng: (req, res) => {
        sequelize.query(`select * from ingredients
        where isFridge = true
        order by name;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    pantryIng: (req, res) => {
        sequelize.query(`select * from ingredients
        where isFridge = false
        order by name;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    }, 

    addRecipe: (req, res) => {
        const { recipeId } = req.params
        sequelize.query(`select from recipes where recipe_id = ${recipeId};`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))
    },

    removeSelectedRecipe: (req, res) => {
        const { recipeId } = req.params
        sequelize.query(`select from recipes where recipe_id = ${recipeId};`)
            .then(dbres => res.status(200).send(dbres[0]))
            .catch(err => console.log(err))
    }
}