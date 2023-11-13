import http from "http";
import fs from 'fs';

class Contact {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
}

const contactsFile = './contacts.json';

const server = http.createServer(async (req, res) => {
    console.log("Request received");

    if (req.method === 'GET' && req.url === '/contacts') {
        const contacts = await readContacts();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(contacts));
    }
    else if (req.method === 'POST' && req.url === '/contacts') {
        let data = '';

        req.on('data', newC => {
            data += newC;
        });

        req.on('end', () => {
            const contacts = readContacts();
            const contact = new Contact(JSON.parse(data).name, JSON.parse(data).phone);

            contacts.push(contact);
            fs.writeFileSync(contactsFile, JSON.stringify(contacts));

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Contact added successfully' }));
        });
    }
    else {
        res.writeHead(404);
        res.end();
    }
});

const readContacts = async () => {
    try {
        const data = await fs.promises.readFile(contactsFile, 'utf-8');
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
};

server.listen(8000);
