const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddeware = require('../middlewares/auth')

const authConfig = require('../../config/auth.json')

// Modelo
const Project = require('../models/project')
// const User = require('../models/user')
const Task = require('../models/task')
const { promises } = require('fs')

const router = express.Router()

router.use(authMiddeware)

router.get('/', async (req, res) => {

    try {
        const projects = await Project.find().populate(['user', 'tasks'])

        return res.send({ projects })
    } catch (error) {
        console.log(error.errors)
        return res.status(400).send({ message: "Error loading projects" })
    }
})

router.get('/:projectId', async (req, res) => {

    const projectId = req.params.projectId

    try {
        const project = await Project.findById(projectId).populate(['user', 'tasks'])

        return res.send({ project })
    } catch (error) {
        console.log(error.errors)
        return res.status(400).send({ message: "Error loading project" })
    }

})

router.post('/', async (req, res) => {

    const { title, description, tasks } = req.body
    const usuarioId = req.userId

    try {
        // Buscando projeto com o mesmo nome para evitar replicas de títulos
        const existe = await Project.findOne({ title: title })

        if (existe) {
            return res.status(400).send({ message: "There is already a project with this title" })
        }

        // Passo 1
        // Criando o projeto com o usuário enviado
        const project = await Project.create({ title: title, description: description, user: usuarioId })

        // Passo 2
        // Criar as tasks
        await Promise.all(tasks.map(async item => {
            const projectTask = new Task({ ...item, project: project._id })

            await projectTask.save()

            project.tasks.push(projectTask)
        }))

        // Passo 3
        // Anexar as tasks no projeto criado
        await project.save()


        return res.status(200).send({ project })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: "Error creating a new project" })
    }
})

router.put('/:projectId', async (req, res) => {

    const projectId = req.params.projectId
    const { title, description, tasks } = req.body
    // const usuarioId = req.userId

    try {
        // Buscando projeto com o mesmo nome para evitar replicas de títulos
        const existe = await Project.findOne({ title: title })

        if (existe) {
            return res.status(400).send({ message: "There is already a project with this title" })
        }

        // Passo 1
        // Atualizar o projeto com o usuário enviado
        // [new:true] retorna a linha atualizada
        const project = await Project.findByIdAndUpdate(projectId, { title: title, description: description }, { new: true })

        // Passo 2
        // Deletar tasks do projeto em questão
        project.tasks = []
        await Task.deleteMany({ project: project._id })

        // Passo 3
        // Recriar as tasks
        await Promise.all(tasks.map(async item => {
            const projectTask = new Task({ ...item, project: project._id })

            await projectTask.save()

            project.tasks.push(projectTask)
        }))

        // Passo 4
        // Anexar as tasks no projeto criado
        await project.save()

        return res.status(200).send({ project })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: "Error updating a new project" })
    }
})

router.delete('/:projectId', async (req, res) => {

    const projectId = req.params.projectId

    try {

        // 1) Precisamos deletar o projeto
        const project = await Project.findByIdAndDelete(projectId)

        if (!project) {
            return res.status(400).send({ message: "Ops Error deleting project" })
        }

        // 2) Precisamos deletar as tarefas do projeto
        project.tasks = []
        await Task.deleteMany({ project: projectId })

        return res.status(200).send({ message: "Successful deleted" })
    } catch (error) {
        console.log(error.errors)
        return res.status(400).send({ message: "Error deleting project" })
    }
})

module.exports = app => app.use('/projects', router)