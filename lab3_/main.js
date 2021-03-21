
$(function(){

var saleData = [];
var page = 1;
const perPage = 5;

let saleTableTemplate = _.template(`
                                <% _.forEach(sales, function(sale) { %>
                                    <tr id="{{data-id}}">
                                    <td><%- sale.customer.email %></td>
                                    <td><%- sale.items.storeLocation %></td>
                                    <td><%- sale.number %></td>
                                    <td><%- moment.utc(sale.saleDate).local().format('LLLL') %></td>
                                    </tr>
                                <% }); %>
                                    `);


});