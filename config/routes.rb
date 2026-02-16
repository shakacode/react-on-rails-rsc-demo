# frozen_string_literal: true

Rails.application.routes.draw do
  # RSC payload route — required for client-side RSC navigation
  rsc_payload_route

  # Demo routes
  get "hello_server", to: "hello_server#index"
  get "products", to: "product_catalog#index"

  root "hello_server#index"
end
