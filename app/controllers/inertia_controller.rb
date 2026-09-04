# frozen_string_literal: true

# Base controller for pages rendered with Inertia.
# Put data shared with every Inertia response here.
# see https://inertia-rails.dev/guide/shared-data
class InertiaController < ApplicationController
  inertia_share app: -> { { name: Rails.application.config.x.app_name } }
end
