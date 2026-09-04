# frozen_string_literal: true

# Renders error pages through Inertia. Wired up via config.exceptions_app,
# so Rails routes unhandled exceptions and missing routes here.
class ErrorsController < InertiaController
  def not_found
    render_error :not_found
  end

  def unprocessable_content
    render_error :unprocessable_content
  end

  def internal_server_error
    render_error :internal_server_error
  end

  private

  def render_error(status)
    return head status unless request.format.html?

    render inertia: "errors/#{status}", status: status
  end
end
