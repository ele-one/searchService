var React = require('react');

var ReactTestUtils = require('react-dom/test-utils');
var List = require('../../react-client/src/components/List.jsx');


var expect = require('chai').expect;
var itemList = ['one', 'two', 'three']

describe('root', function () {
  it('renders without problems', function () {
    // var root = ReactTestUtils.renderIntoDocument(<List />);
    var root = ReactTestUtils.isCompositeComponent(List, <List items={itemList} />)
    expect(root).to.exist;
  });
});


