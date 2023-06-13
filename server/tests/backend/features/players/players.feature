Feature: Player Management in the Dice Game
    Scenario: A valid non existing player
        Given a player name "John"
        When I send a POST request to "/players" with this player
        Then the response status code should be 201
        And  the response body should contain the player details
    Scenario: A valid existing player
        Given a player name "John"
        When I send a POST request to "/players" with this player
        Then the response status code should be 400
    Scenario: Creating a new anonymous player
        Given a player name ""
        When I send a POST request to "/players" with this player
        Then the response status code should be 201
        And  the response body should contain the player details
    Scenario: Updating a player's details
        Given a player name "Pepe"
        When I send a POST request to "/players" with this player
        Then the response body should contain the player details
        Given a player name "Juan"
        When I send a PUT request to "/players" with a new player name
        Then the response status code should be 200
    Scenario: Get a list of players
        Given a player name "Manuel"
        When I send a POST request to "/players" with this player
        Given a player name "Carlos"
        When I send a POST request to "/players" with this player
        And I send a GET request to "/players"
        Then the response status code should be 200