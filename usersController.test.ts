import { Request } from "express"
import { UsersController } from "./src/controllers/usersController"
import { makeMockResponse } from "./src/mocks/mockResponse"

describe('User Controller',() =>{
    const usersController = new UsersController

    const mockRequest = {} as Request
    const mockResponse = makeMockResponse()

    it('Deve listar os usuarios',() =>{
        usersController.listarUsuario(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toHaveLength(1)

    })

    it('Deve criar um novo Usuario',() =>{
        mockRequest.body ={
            name: 'Novo Usuario'
        }
        usersController.criarUsuario(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({'mensagem': `Usuario Novo Usuario, criado`})
    })

    it('Não deve criar usuario com nome em branco',() =>{

        mockRequest.body ={
            name: ''
        }
        usersController.criarUsuario(mockRequest,mockResponse)
        expect(mockResponse.state.status).toBe(403)
        expect(mockResponse.state.json).toMatchObject({mensagem: 'Não é possivel criar um usuario sem nome'})
    })
})