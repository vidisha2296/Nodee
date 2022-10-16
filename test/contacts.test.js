let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

chai.use(chaiHttp);

describe('Contact API', () => {
   
    /**
     * Test the GET route
     */
    describe("GET /api/getAll", () => {
        it("It should GET all the contacts", (done) => {
            chai.request('http://localhost:7000')
                .get("/api/getAll")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // response.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all the contacts", (done) => {
            chai.request('http://localhost:7000')
                .get("/api/getAll")
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

    });


    /**
     * Test the GET (by id) route
     */
    describe("GET /api/getOne/:id", () => {
        it("It should GET a contact by ID", (done) => {
            const contactId = 1;
            chai.request('http://localhost:7000')                
                .get("/api/getOne/" + contactId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    // response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('phoneNo');
                    response.body.should.have.property('img');
                    response.body.should.have.property('id').eq(1);
                done();
                });
        });

        it("It should NOT GET a contact by ID", (done) => {
            const contactId = 123;
            chai.request('http://localhost:7000')                
                .get("/api/getOne/" + contactId)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The contact with the provided ID does not exist.");
                done();
                });
        });

    });
    

    /**
     * Test the POST route
     */
    describe("POST /api/post", () => {
        // this.timeout(10000)
        it("It should POST a new contact", (done) => {
            const task = {
                name: "Task 4",
                phoneNo:12345,
                img:"fdgdfghththth"
            };
            chai.request('http://localhost:7000')                
                .post("/api/post")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    // response.body.should.have.property('id').eq(4);
                    response.body.should.have.property('name').eq("Task 4");
                    response.body.should.have.property('phoneNo').eq(12345);
                    response.body.should.have.property('img').eq("fdgdfghththth");
                done();
                });
        });

        it("It should NOT POST a new contact without the name property", (done) => {
            const task = {
                name: "Task 4",
                phoneNo:12345,
                img:"fdgdfghththth"
            };
            chai.request('http://localhost:7000')                
                .post("/api/post")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    // response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });

    });


    /**
     * Test the PUT route
     */
    // describe("PUT /api/tasks/:id", () => {
    //     it("It should PUT an existing task", (done) => {
    //         const taskId = 1;
    //         const task = {
    //             name: "Task 1 changed",
    //             completed: true
    //         };
    //         chai.request(server)                
    //             .put("/api/tasks/" + taskId)
    //             .send(task)
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('object');
    //                 response.body.should.have.property('id').eq(1);
    //                 response.body.should.have.property('name').eq("Task 1 changed");
    //                 response.body.should.have.property('completed').eq(true);
    //             done();
    //             });
    //     });

    //     it("It should NOT PUT an existing task with a name with less than 3 characters", (done) => {
    //         const taskId = 1;
    //         const task = {
    //             name: "Ta",
    //             completed: true
    //         };
    //         chai.request(server)                
    //             .put("/api/tasks/" + taskId)
    //             .send(task)
    //             .end((err, response) => {
    //                 response.should.have.status(400);
    //                 response.text.should.be.eq("The name should be at least 3 chars long!");
    //             done();
    //             });
    //     });        
    // });
    

    /**
     * Test the PATCH route
     */

    describe("PATCH /api/update/:id", () => {
        it("It should PATCH an existing contact", (done) => {
            const contactId = 1;
            const task = {
                name: "Task 1 patch",
                phoneNo:12345,
                img:"dfdgfdfdfdbfdb"
            };
            chai.request('http://localhost:7000')                
                .patch("/api/update/" + contactId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('name').eq("Task 1 patch");
                    response.body.should.have.property('phoneNo').eq(12345);
                    response.body.should.have.property('img').eq("dfdgfdfdfdbfdb");
                done();
                });
        });

        it("It should NOT PATCH an existing contact with a name with less than 3 characters", (done) => {
            const taskId = 1;
            const task = {
                name: "Ta"
            };
            chai.request('http://localhost:7000')                
                .patch("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });        
    });
    

    /**
     * Test the DELETE route
     */
    describe("DELETE /api/delete/:id", () => {
        it("It should DELETE an existing contact", (done) => {
            const contactId = 1;
            chai.request('http://localhost:7000')                
                .delete("/api/delete/" + contactId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a contact that is not in the database", (done) => {
            const contactId = 145;
            chai.request('http://localhost:7000')                
                .delete("/api/delete/" + contactId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The contact with the provided ID does not exist.");
                done();
                });
        });

    });




});

