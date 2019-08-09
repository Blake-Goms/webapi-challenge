const router = require('express').Router()

// let people = [
//     {
//         id: 1,
//         name: 'Frodo Baggins',
//     },
//     {
//         id: 2,
//         name: 'Samewise',
//     },
//     {
//         id: 3,
//         name: 'Aragorn',
//     }    
// ]

// let chores = [
//     {
//         id: 1,
//         description: 'take the ring to Mordor',
//         notes: 'make your way to Mount Doom',
//         assignedTo: 1, // the id of Frodo,
//         completed: true
//     },
//     {
//         id: 2,
//         description: 'destroy the ring',
//         notes: 'cast the ring into the fire inside Mount Doom',
//         assignedTo: 2,
//         completed: false
//     },
//     {
//         id: 3,
//         description: 'Become who I was born to be',
//         notes: 'For the men of the west!',
//         assignedTo: 3,
//         completed: true
//     },
// ]


const people = [
    {
        id: 1,
        name: "Frodo Baggins",
        chores: [
                {
                    id: 1,
                    description: 'take the ring to Mordor',
                    notes: 'make your way to Mount Doom',
                    assignedTo: 1, // the id of Frodo,
                    completed: true
                },
        ]
    },
    {
        id: 2,
        name: "Samewise Gamgee",
        chores: [
            {
                id: 1,
                description: 'help destroy the ring',
                notes: 'help cast the ring into the fire inside Mount Doom',
                assignedTo: 2,
                completed: false
            }
        ]
    },
    {
        id: 3,
        name: "Aragorn Son of Arathorn",
        chores: [
                {
                    id: 1,
                    description: 'Become who I was born to be',
                    notes: 'For the men of the west!',
                    assignedTo: 3,
                    completed: true
                },
        ]
    },
    {
        id: 4,
        name: "Random",
        chores: [
                {
                    id: 1,
                    description: 'afasads',
                    notes: 'asd',
                    assignedTo: 4,
                    completed: true
                },
        ]
    },
    {
        id: 5,
        name: "Random 2 ",
        chores: [
                {
                    id: 1,
                    description: 'afasads 2',
                    notes: 'asd 2',
                    assignedTo: 5,
                    completed: true
                },
        ]
    },

]


router.get('/', (req,res)=>{
    res.status(200).json(people);
})

router.get('/:id', (req,res)=>{
    const id = req.params.id;
    let [currentPerson] = people.filter( person => person.id == id);
    if(currentPerson){
        res.status(200).json(currentPerson);
    } else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})


router.get('/:id/chores', (req,res)=>{
    const id = req.params.id;
    const completed = req.query.completed

    let [currentPerson] = people.filter( person => person.id == id);

    if(currentPerson){
        if(completed == "true"){
            let completedChores = currentPerson.chores.filter(chore => chore.completed === true)

            res.status(200).json(completedChores)
        } else {
            res.status(200).json(currentPerson.chores)
        }
    }  else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})


router.post('/:id/chores', (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    let [currentPerson] = people.filter( person => person.id == id);
    if(!body.assignedTo) {
        res.status(404).json({message: "You need an assignedTo key!"})
    }
    else if(currentPerson){
        currentPerson.chores.push(body);
        res.status(200).json(currentPerson.chores)
    }  else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})


router.put('/:id/chores', (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    let [currentPerson] = people.filter( person => person.id == id);
    if(!body.assignedTo && !body.id) {
        res.status(404).json({message: "You need an assignedTo key and an ID!!"})
    }
    else if(currentPerson){
        let newChores = currentPerson.chores.filter(chore => chore.id != body.id);
        currentPerson.chores = [...newChores, body]
        res.status(200).json(currentPerson.chores)
    }  else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})


router.delete('/:id/chores/:choreId', (req,res)=>{
    const userId = req.params.id;
    const choreId = req.params.choreId
    let [currentPerson] = people.filter( person => person.id == userId);
    let newChores = currentPerson.chores.filter(chore => chore.id != choreId)
    if(currentPerson){
        currentPerson.chores = [...newChores]
        res.status(200).json(currentPerson.chores)
    }  else {
        res.status(400).json({message: "Oh no! Couldn't find that user!"})
    }
})

module.exports = router;