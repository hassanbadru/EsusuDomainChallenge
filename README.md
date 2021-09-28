
# Esusu Full Stack Project
 **Requirements**
 - Display a chess board which the user can interact with.
 - Implement valid chess-logic (only legal moves can be made on the board).
 - Allow a person to play a game against another player over a network.
 - Save and load games by connecting to a backend that stores games.

 **Added Features**
 - Play against the CPU.

# Projects
 - **EsusuApp** - React Native (*Frontend*)
 - **EsusuServer** - NodeJS (*Backend*)

## Project Descriptions
**EsusuApp (Frontend)**

Create a react-native mobile application that presents a valid chess board. It should be possible
for a person to make moves but only legal moves. It is a frontend web app that uses the headless game engine to validate moves and both displays the board and captures user input using the visualization library.

**EsusuServer (Backend)**

Write a node.js web service using any framework of your preference which exposes an API through which a user can save and load chess games. Create an endpoint
`/game/` through which a client can POST to create new games, PUT to update existing games
(based on ID) and GET and DELETE those games (based on id as well).

 - **API Documentation**:  ([OpenAPI 3.0 YAML](EsusuServer/api/openapi.yaml))
 - **Persistence**: JSON / Local Storage ([games.db.json](EsusuServer/games.db.json))

## How to run
**EsusuServer (Backend)**

    git clone https://github.com/hassanbadru/EsusuDomainChallenge.git
    cd EsusuServer && npm install && npm start


 > Open http://localhost:8000/docs to view Swagger UI

**EsusuApp (Frontend)**

    cd EsusuApp && npm install && npm start

**Expo Client**
![Using Expo Client][expo-screenshot]

**Game Options Page**
![Game Options][start-page]

**Load Game with ID: 1**
![Load Options][load-game]

## OpenAPI Specification
    openapi: 3.0.1
    info:
      title: Chess App
      description: This is a backend service for playing Chess.
      contact:
        email: demo@esusu.org
      license:
        name: Apache 2.0
        url: http://www.apache.org/licenses/LICENSE-2.0.html
      version: 1.0.0
    externalDocs:
      description: Find out more about Swagger
      url: http://swagger.io
    servers:
    - url: http://localhost:8000/
    tags:
    - name: game
      description: Everything about games
    paths:
      /game:
        put:
          tags:
          - game
          summary: Update an existing game
          operationId: updateGame
          requestBody:
            description: Game object that needs to be added to the store
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/Game'
              application/xml:
                schema:
                  $ref: '#/components/schemas/Game'
            required: true
          responses:
            "400":
              description: Invalid ID supplied
              content: {}
            "404":
              description: Game not found
              content: {}
            "405":
              description: Validation exception
              content: {}
          x-codegen-request-body-name: body
          x-swagger-router-controller: Game
        post:
          tags:
          - game
          summary: Start a new game
          operationId: addGame
          requestBody:
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/Game'
              application/xml:
                schema:
                  $ref: '#/components/schemas/Game'
            required: false
          responses:
            "200":
              description: successful create
              headers:
                Access-Control-Allow-Origin:
                  schema:
                    type: string
                Access-Control-Allow-Methods:
                  schema:
                    type: string
                Access-Control-Allow-Headers:
                  schema:
                    type: string
              content:
                application/xml:
                  schema:
                    $ref: '#/components/schemas/Game'
                application/json:
                  schema:
                    $ref: '#/components/schemas/Game'
            "405":
              description: Invalid input
              content: {}
          x-codegen-request-body-name: body
          x-swagger-router-controller: Game
      /game/{gameId}:
        get:
          tags:
          - game
          summary: Find game by ID
          description: Returns a single game
          operationId: getGameById
          parameters:
          - name: gameId
            in: path
            description: ID of game to return
            required: true
            style: simple
            explode: false
            schema:
              type: integer
              format: int64
          responses:
            "200":
              description: successful operation
              content:
                application/xml:
                  schema:
                    $ref: '#/components/schemas/Game'
                application/json:
                  schema:
                    $ref: '#/components/schemas/Game'
            "400":
              description: Invalid ID supplied
              content: {}
            "404":
              description: Game not found
              content: {}
          x-swagger-router-controller: Game
        post:
          tags:
          - game
          summary: Updates a game in the store with form data
          operationId: updateGameWithForm
          parameters:
          - name: gameId
            in: path
            description: ID of game that needs to be updated
            required: true
            style: simple
            explode: false
            schema:
              type: integer
              format: int64
          requestBody:
            content:
              application/x-www-form-urlencoded:
                schema:
                  $ref: '#/components/schemas/game_gameId_body'
          responses:
            "405":
              description: Invalid input
              content: {}
          x-swagger-router-controller: Game
        delete:
          tags:
          - game
          summary: Deletes a game
          operationId: deleteGame
          parameters:
          - name: api_key
            in: header
            required: false
            style: simple
            explode: false
            schema:
              type: string
          - name: gameId
            in: path
            description: Game id to delete
            required: true
            style: simple
            explode: false
            schema:
              type: integer
              format: int64
          responses:
            "400":
              description: Invalid ID supplied
              content: {}
            "404":
              description: Game not found
              content: {}
          x-swagger-router-controller: Game
    components:
      schemas:
        Game:
          required:
          - name
          - pgn
          type: object
          properties:
            id:
              type: integer
              format: int64
            name:
              type: string
              example: mygame
            pgn:
              type: string
              example: "[Event 'F/S Return Match'] [Site 'Belgrade, Serbia JUG'] [Date\
                \ '1992.11.04'] [Round '29'] [White 'Fischer, Robert J.'] [Black 'Spassky,\
                \ Boris V.'] [Result '1/2-1/2'] 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening\
                \ is called the Ruy Lopez.} 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6\
                \ 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7\
                \ 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6\
                \ Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7\
                \ 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30.\
                \ a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36.\
                \ Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2\
                \ 42. g4 Bd3 43. Re6 1/2-1/2\n"
          example:
            pgn: "[Event 'F/S Return Match'] [Site 'Belgrade, Serbia JUG'] [Date '1992.11.04']\
              \ [Round '29'] [White 'Fischer, Robert J.'] [Black 'Spassky, Boris V.']\
              \ [Result '1/2-1/2'] 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called\
              \ the Ruy Lopez.} 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9.\
              \ h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15.\
              \ Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6\
              \ 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26.\
              \ Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4\
              \ 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4\
              \ 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2\n"
            name: mygame
            id: 0
          xml:
            name: Game
        ApiResponse:
          type: object
          properties:
            code:
              type: integer
              format: int32
            type:
              type: string
            message:
              type: string
        game_gameId_body:
          properties:
            name:
              type: string
              description: Updated name of the game
            pgn:
              type: string
              description: Updated PGN of the game

<!-- MARKDOWN LINKS & IMAGES -->
[expo-screenshot]: screenshots/expo.png
[start-page]: screenshots/start_page.png
[load-game]: screenshots/load_game_1.png
[db-json]: EsusuServer/games.db.json
