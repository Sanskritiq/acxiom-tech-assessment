// signup form that takes user name, email and password
import React, { useState } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Name:', userName);
        console.log('Email:', email);
        console.log('Password', password);
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>User Name</FormLabel>
                    <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <Button type="submit">Signup</Button>
            </form>
            <Button>
                <Link to="/login">Login</Link>
            </Button>
        </div>
    );
}

export default Signup;