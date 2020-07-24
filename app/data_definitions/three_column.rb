module DataDefinitions
  class ThreeColumn < DataDefinitions::Base
    # XML XPath Selectors
    # XML XPath Selectors
    XPATH = {
      masthead_type: '//group[@identifier="masthead"]/text[@identifier="mastheadType"]',
      branded_header: '//group[@identifier="branded201611"]/text[@identifier="header"]',
      branded_image_path: '//group[@identifier="branded201611"]/asset[@identifier="image"]',
      branded_alt_text: '//group[@identifier="branded201611"]/text[@identifier="altText"]'
    }.freeze

    # Preset Data Values
    DEFAULTS = {
      XPATH[:masthead_type] => 'Branded Masthead',
      XPATH[:branded_header] => 'A Brand New Branded Masthead',
      XPATH[:branded_image_path] => 'media/images/mastheads/branded-new.jpg',
      XPATH[:branded_alt_text] => 'Branded - New alt text'
    }.freeze

    # Preset data as hash representing Cascade XML data.
    CASCADE_DATA = {
      v201611: {
        slider: {
          header: 'Thug Life at Chapman University',
          slides: [
            {
              subTitle: 'Optional text can go here',
              altText: 'image alt attribute here',
              photoBy: 'I.M. Photographer',
              image: {path: 'media/images/mastheads/slider-v201611.jpg'}
            },
            {
              subTitle: '',
              altText: 'image alt attribute here',
              photoBy: '',
              image: {path: 'media/images/mastheads/slider-v201611.jpg'}
            },
            {
              subTitle: 'Slider Slide #3 of 3',
              altText: 'image alt attribute here',
              photoBy: '',
              image: {path: 'media/images/mastheads/slider-v201611.jpg'}
            }
          ]
        }
      }
    }.freeze

    # Class Methods
    def self.default
      three_column = DataDefinitions::ThreeColumn.new
      three_column.set_defaults
      three_column
    end
  end
end
