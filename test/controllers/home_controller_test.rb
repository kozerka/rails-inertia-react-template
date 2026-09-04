require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "renders the home page" do
    get root_url

    assert_response :success
    assert_inertia_component "home/index"
    assert_inertia_props name: "World"
  end

  test "shares the application name" do
    get root_url

    assert_inertia_props app: { name: Rails.application.config.x.app_name }
  end
end
