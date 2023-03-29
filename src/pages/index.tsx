import React, { useState } from 'react';
import { useRouter } from "next/router";
import { Input, Layout, Image, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout;
const { Search } = Input;

// Header of the index page, with a linker to page "/login"   
const IndexHeader = () => {
    const headerStyle: React.CSSProperties = {
        color: 'white',
        height: 64,
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor: '#6495ED',
        display: 'flex',
        flexDirection: 'row',
    };

    const router = useRouter();

    return (
        <Header style={headerStyle}>
            <div style={{ marginRight: 'auto' }}>
                GIF Explorer
            </div>
            <div>
                <Button type="link" onClick={() => {router.push("/login")}}>
                    <UserOutlined style={{ fontSize: '1.5rem', color:"white"} } />
                </Button>
            </div>
        </Header>
    );
};

// Search box of the index page, consider moving to folder "components" for reusing 
const IndexSearchBox = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleCommit = () => {
        console.log(searchInput)
    };

    return (
        <Search
            size="large"
            placeholder="输入你感兴趣的内容"
            enterButton="搜索"
            color='#6495ED'
            allowClear
            maxLength={50}
            onSearch={handleCommit}
            onChange={handleInput}
        />
    );
};

// Main content of the index page, with a logo icon and a search box
const IndexContent = () => {
    const contentStyle: React.CSSProperties = {
        minHeight: 600,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    return (
        <Content style={contentStyle}>
            <div style={{ margin: "5% auto" }}>
                <Image
                    width={200}
                    src="https://cdn.jsdelivr.net/gh/saiblo/saiblo-public-cdn@2.7.6/static/favicon.ico"
                    alt=''
                />
            </div>
            <div style={{ maxWidth: 800, width: "100%", margin: "0 auto" }}>
                {IndexSearchBox()}
            </div>
        </Content>
    );
};

// Footer of the index page
const IndexFooter = () => {
    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#6495ED',
    };

    return (
        <Footer style={footerStyle}>
            GIF Explorer ©2023 Created by Nullptr
        </Footer>
    );

};


const IndexScreen = () => {
    return (
        <Layout className="layout">
            {IndexHeader()}
            {IndexContent()}
            {IndexFooter()}
        </Layout>
    );
}

export default IndexScreen;