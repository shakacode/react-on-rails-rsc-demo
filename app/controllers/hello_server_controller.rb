# frozen_string_literal: true

class HelloServerController < ApplicationController
  include ReactOnRailsPro::Stream

  def index
    @hello_server_props = {
      name: "React on Rails Pro"
    }

    stream_view_containing_react_components(template: "hello_server/index")
  end
end
