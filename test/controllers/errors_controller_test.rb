require "test_helper"

class ErrorsControllerTest < ActionDispatch::IntegrationTest
  test "renders the not found page" do
    get "/404"

    assert_response :not_found
    assert_inertia_component "errors/not_found"
  end

  test "renders the unprocessable content page" do
    get "/422"

    assert_response :unprocessable_content
    assert_inertia_component "errors/unprocessable_content"
  end

  test "renders the internal server error page" do
    get "/500"

    assert_response :internal_server_error
    assert_inertia_component "errors/internal_server_error"
  end

  test "responds without a body for non-HTML requests" do
    get "/404", as: :json

    assert_response :not_found
    assert_empty response.body
  end
end
