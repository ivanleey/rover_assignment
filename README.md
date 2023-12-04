# Rover React Assignment

Welcome and thank you for taking the time to complete the Rover take-home assignment.

You will have 4 days to complete the assignment. Once you have completed your solution, please reply with a link to a github repository.

The goal of this assignment is to build the Judo login page with public and protected routes.

## Prerequisite

-   Docker (https://docs.docker.com/get-docker)
-   Yarn

## Running the stack

```
docker-compose up
```

You can now access the frontend via http://localhost:3000 and the backend via http://localhost:8080 (explore the GraphQL API http://localhost:8080/graphql). Refer to [database.sql](./database.sql) for dummy data and login credentials.

# Requirements

-   build reusable components based on the design
-   build the `/login` page described in the [design](./design/login-measurments.png)
-   A simple page `/products` that lists the products with a button to logout. There are no design requirements here
-   A Home page `/` with a simple button to go to `/login`
-   Add protected and public routes:
    -   `/`: public anyone can view this page
    -   `/login`: if a user is already signed in redirect to `/products`
    -   `/products`: a user must be signed in to view
-   You can use either the Rest or the GraphQL API
-   Handle When a session expires by refreshing the session and retrying the same request that failed due to session expiry. To help test this flow you can run the following command that will expire all sessions (refresh tokens are still valid after expiring): `docker-compose exec postgres psql -U postgres dev -c "UPDATE sessions SET expires_at = now()"`
