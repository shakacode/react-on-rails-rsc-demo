# frozen_string_literal: true

class ProductCatalogController < ApplicationController
  include ReactOnRailsPro::Stream

  def index
    # No props needed — the server component fetches its own data
    # This is one of the key RSC advantages: data fetching moves from
    # controller → component, closer to where data is consumed
    @product_catalog_props = {}

    stream_view_containing_react_components(template: "product_catalog/index")
  end
end
