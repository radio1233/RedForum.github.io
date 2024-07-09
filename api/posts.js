// api/posts.js
let posts = [];

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(posts);
    } else if (req.method === 'POST') {
        const newPost = { id: Date.now(), ...req.body };
        posts.push(newPost);
        res.status(201).json(newPost);
    } else if (req.method === 'PUT') {
        const { id, ...updatedPost } = req.body;
        posts = posts.map(post => post.id === id ? { ...post, ...updatedPost } : post);
        res.status(200).json(updatedPost);
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        posts = posts.filter(post => post.id !== id);
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
