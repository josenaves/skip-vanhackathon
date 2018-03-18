import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { CheckBox } from 'native-base';

const API_HOST = 'http://api-vanhack-event-sp.azurewebsites.net';
const PRODUCTS_ENDPOINT = `${API_HOST}/api/v1/Product`;

export default class StoreFrontScreen extends Component {
    static navigationOptions = {
        title: 'Product Listing',
      };

    constructor(props) {
        super(props)
        this.state = { products: [], error: false, loading: false };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    async fetchProducts() {
        const options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          };

          try {
            const resp = await fetch(PRODUCTS_ENDPOINT, options);
            const respJson = await resp.json();
  
            if (resp.ok) {
                const products = respJson.map((item) => {
                    const status = { selected: false };
                    return { ...item, ...status };
                });
                console.log(products);
                this.setState({ products });
            } else {
                console.error("Products error");
            }
            this.setState({ loading: false });
  
          } catch (e) {
            console.error(`Products error - url: ${PRODUCTS_ENDPOINT} - error: `, e);
            this.setState({ error: true, loading: false });
          }
  
    }
    
    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => {
        console.log(item)
        const { name, description, price, selected } = item;
        return (
            <ListItem
                name={name}
                description={description}
                price={price}
                selected={selected}
            />
        );
    }

    render() {
        return (
            <FlatList
                style={styles.listContainer}
                data={this.state.products}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        );
    }
}

const ListItem = ({name, description, price, selected}) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.firstCol}>
                <CheckBox
                    checked={selected}
                    style={styles.checkbox}
                />
            </View>
            <View style={styles.secondCol}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.thirdCol}>
                <Text>${price.toFixed(2)}</Text>
            </View>
        </View>   
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        justifyContent: 'center',
        elevation: 1,
        borderRadius: 3,
    },
    firstCol: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondCol: {
        flex: 5,
        justifyContent: 'center',
        padding: 5
    },
    thirdCol: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    description: {
        fontSize: 12
    },
    price: {
        fontWeight: 'bold',
        fontSize: 14
    },
  });
