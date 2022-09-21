import React from "react";
import Card from 'react-bootstrap/Card';

const style = {
    card: {
        marginBottom: "25px",
    }
}

function PostCard(props) {
    return (
        <Card id={props.id} style={style.card}>
            <Card.Header>Quote</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {props.content}
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default PostCard;