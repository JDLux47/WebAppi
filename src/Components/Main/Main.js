import React from 'react'
import { Image, Col, Row } from 'antd';
import prof from './prof.png';
import 'C:/Users/1/Desktop/react-app/src/Style.css'
import 'C:/Users/1/Desktop/react-app/src/Components/Main/StyleMain.css'

const Main = ({user}) =>{
    var date 

    if(user.isAuthenticated) (
        date = user.dateUpdateBalance,
        date = date.slice(0, 10)
        )
    return (
        <React.Fragment>
            {user.isAuthenticated ? (
                <>
                <Row>
                    <Col span={12} style={{fontSize: 'large'}}>
                        <div>
                            <Image src={prof} style={{width:'100%', textAlign: 'center'}}/>
                            <br/>
                            <h1 style={{textAlign: 'center', marginTop: '-5%'}}>{user.login}</h1>
                        </div>
                    </Col>
                    
                    <Col span={12} style={{fontSize: 'large', marginTop: '2%'}}>
                        <div>
                            <h1>Данные пользователя</h1>
                            <div className="ant-space-item"> Имя: {user.name} </div>
                            <div className="ant-space-item"> Логин: {user.login} </div>
                            {(user.userRole != "admin")? (
                                <>
                                    <div className="ant-space-item"> Баланс: {user.balance} </div>
                                    <div className="ant-space-item"> Дата регистрации: {date} </div>
                                </>
                            ) : ("")}
                        </div>
                    </Col>
                </Row>
                </>
            ) : ("Для отображения данной страницы необходима авторизация!")}
        </React.Fragment>
    )
}
export default Main