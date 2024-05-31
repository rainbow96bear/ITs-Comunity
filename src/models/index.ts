import { Sequelize } from "sequelize";
import { databaseConfig } from "./../config/databaseConfig";
import Users from "./Users";
import Posts from "./Posts";
import Categories from "./Categories";

const sequelize = new Sequelize(
  databaseConfig.development.database,
  databaseConfig.development.username,
  databaseConfig.development.password,
  {
    host: databaseConfig.development.host,
    dialect: "mysql",
  }
);

// 각 모델 초기화
const UsersModel = Users.initModel(sequelize);
const PostsModel = Posts.initModel(sequelize);
const CategoriesModel = Categories.initModel(sequelize);

// Set up associations
// 각 모델이 관계를 설정하는 메서드를 가지고 있으면 호출
if (UsersModel.associate) {
  UsersModel.associate({ Posts: PostsModel });
}
if (PostsModel.associate) {
  PostsModel.associate({ Users: UsersModel });
}

// Categories 모델은 관계를 설정하지 않으므로 제외

// 모델 및 연결 객체 반환
const db = {
  sequelize,
  Users: UsersModel,
  Posts: PostsModel,
  Categories: CategoriesModel,
};

export default db;
