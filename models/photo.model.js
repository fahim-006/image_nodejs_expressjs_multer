module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("product_images", {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: "id"
            },

            product_id: {
                type: Sequelize.STRING,
                field: "product_id"
            },
            product_image: {
                type: Sequelize.STRING,
                field: "product_image"
            },
        });
        return Photo;
    };