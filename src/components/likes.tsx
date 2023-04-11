import { Space } from 'antd';
import { HeartFilled, HeartTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';

interface LikesProps {
    likes: number;
    style?: React.CSSProperties;
}

export const Likes: React.FC<LikesProps> = (props: LikesProps) => {
    const [liked, setLiked] = useState(false);

    const onClick = () => {
        setLiked((val) => !val);
    };

    return (
        <Space align="center" style={props.style}>
            {liked ? (
                <HeartFilled
                    style={{ color: "#f5222d", fontSize: 16 }}
                    onClick={onClick}
                />
            ) : (
                <HeartTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: 16 }}
                    onClick={onClick}
                />
            )}
            <span style={{ fontSize: 16 }}>{props.likes !== undefined && (props.likes + Number(liked))}</span>
        </Space>
    );
};
