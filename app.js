const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.use(express.static('static'))

const INDEX = {
    path: "/",
    id: "index",
    name: "AWR"
};
const REALISATIONS = {
    path: "/realisations",
    id: "realisations",
    name: "Réalisations"
};
const TARIFS = {
    path: "/tarifs",
    id: "tarifs",
    name: "Tarifs",
    callToAction: true
};
const pages = [
    INDEX,
    {
        path: "/atelier",
        id: "atelier",
        name: "L'Atelier"
    },
    REALISATIONS,
    TARIFS,
]

pages.forEach(page => {
    app.get(page.path, (req, res) => {
        res.render(page.id, {title: page.name, currentPageId: page.id, pages})
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
