import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SignInReq } from '../../service/Auth';

export const SignIn = () => {
    interface SignIn {
        email: string;
        password: string;
    }

    const [user, setUser] = useState<SignIn>({
        email: '',
        password: ''
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await SignInReq(user);
        console.log("Token", token);
        console.log("User Data", user);
        setUser({
            email: "",
            password: ""
        });
    };
    return (
        <>
            <h1>Sign In</h1>
            <Form className='d-flex flex-column align-items-center' onSubmit={handleOnSubmit}>
                <div className='w-50 mx-auto mt-5'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={user.email}
                            onChange={handleOnChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={handleOnChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
};