import { AssistantPackage, RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const rbidColors: RuleDefinition = {
  rule: async (context) => {
    context.utils.report('not a RBID color')
  },
  name: 'rbid-colors-assistant/rbid-colors',
  title: 'RBID Colors',
  description: 'Reports colors not in the RBID palettes',
}

const textDisallow: RuleDefinition = {
  rule: async (context) => {
	const { utils } = context
	
	// Get a configuration option named "pattern"
	const pattern = utils.getOption('pattern')
	if (typeof pattern !== 'string') throw Error()
	
	// Iterate
	for (const layer of utils.objects.text) {
	const value = layer.attributedString.string
	// Test
	if (value.includes(pattern)) {
	  // Report
	  utils.report(`Layer “${layer.name}” contains “${pattern}”`, layer)
	}
	}
  },
  name: 'rbid-colors-assistant/text-disallow',
  title: (config) => `Text should not contain "${config.pattern}"`,
  description:
    'Reports a violation when text layers contain a configurable text pattern',
}

const assistant: AssistantPackage = async () => {
  return {
    name: 'rbid-colors-assistant',
    rules: [rbidColors, textDisallow],
    config: {
      rules: {
        'rbid-colors-assistant/rbid-colors': { active: false },
        'rbid-colors-assistant/text-disallow': {
	        active: true,
	        pattern: 'Type something',
	    },
      },
    },
  }
}

export default assistant
