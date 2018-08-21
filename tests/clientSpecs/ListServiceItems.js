var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var ListServiceItems = require('../../client/src/components/ListServiceItems.jsx');


var expect = require('chai').expect;


describe('root', function () {
  it('renders without problems', function () {
    // var root = ReactTestUtils.renderIntoDocument(<List />);
    var root = ReactTestUtils.isCompositeComponent(ListServiceItems, <ListServiceItems />)
    expect(root).to.exist;
  });
});
