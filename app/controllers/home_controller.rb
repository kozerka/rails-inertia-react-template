# frozen_string_literal: true

class HomeController < InertiaController
  def index
    render inertia: { name: "World" }
  end
end
