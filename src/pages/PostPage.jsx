import React, { useEffect, useState } from "react";
import "/src/styles/PostPage.css";
import Header from "../components/Header";
const PostFeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const userRes = await fetch("https://randomuser.me/api/?results=50");
                const userData = await userRes.json();

                const mockPosts = userData.results.map((user, index) => ({
                    id: index + 1,
                    username: user.login.username,
                    avatar: user.picture.medium,
                    image: `https://picsum.photos/600/500?random=${index + 1}`,
                    caption: "Enjoying the moment!",
                    likes: Math.floor(Math.random() * 500),
                    timestamp: new Date().toLocaleString(),
                    comments: [
                        { user: "alice", text: "Looks awesome!" },
                        { user: "bob", text: "Nice pic!" },
                        { user: "charlie", text: "😍" },
                    ],
                }));

                setPosts(mockPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPosts();
    }, []);

    return (
        <>
        <Header />
        <div className="post-feed">
            {posts.map((post) => (
                <div className="post-card" key={post.id}>
                    <div className="post-header">
                        <img src={post.avatar} alt="avatar" className="avatar" />
                        <span className="username">{post.username}</span>
                    </div>

                    <img src={post.image} alt="post" className="post-image" />

                    <div className="post-info">
                        <p className="caption">{post.caption}</p>
                        <p className="likes">❤️ {post.likes} likes</p>

                        <div className="comments">
                            {post.comments.map((c, idx) => (
                                <p key={idx}>
                                    <strong>{c.user}</strong> {c.text}
                                </p>
                            ))}
                        </div>

                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="comment-input"
                        />
                        <p className="timestamp">{post.timestamp}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default PostFeed;
