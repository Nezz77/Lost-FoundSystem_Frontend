import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SignUpReq } from '../../service/Auth';
import { useAuth } from './AuthProvider';   

export const SignUp = () => {
    interface SignUp {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
    }
    const { login } = useAuth(); // Get the login function from AuthProvider

    const [user, setUser] = useState<SignUp>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    });

    const handleonChange = (e: any) => {
        const { name, value } = e.target;
        setUser((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // api call to sign up
        const token = await SignUpReq(user);
        console.log("Token", token);
        console.log("User Data", user);

        setUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: ""
        });
         login(token) // Call the login function with the token
    };

    return (
        <>
            <h1>Sign up</h1>
            <Form className='d-flex flex-column align-items-center' onSubmit={handleonSubmit}>
                <div className='w-50 mx-auto mt-5'>

                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="firstName"
                            placeholder="First Name"
                            name='firstName'
                            value={user.firstName}
                            onChange={handleonChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="lastName"
                            placeholder="Last Name"
                            name='lastName'
                            value={user.lastName}
                            onChange={handleonChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name='email'
                            value={user.email}
                            onChange={handleonChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={user.password}
                            onChange={handleonChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSelect">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            name='role'
                            value={user.role}
                            onChange={handleonChange}
                        >
                            <option>Select Role</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                            <option value="STAFF">STAFF</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
};