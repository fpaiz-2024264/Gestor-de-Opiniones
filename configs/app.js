import express from 'express';
import { corsConfig } from './cors-configurations.js';
import { helmetConfig } from './helmet-configurations.js';

import userRoutes from '../src/users/user.routes.js';
import postRoutes from '../src/posts/post.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';

const app = express();
// IMPORTANTE
app.use(express.json());       // permite leer JSON
app.use(express.urlencoded({ extended: true })); // permite form-data
app.use(corsConfig);
app.use(helmetConfig);

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

export default app;