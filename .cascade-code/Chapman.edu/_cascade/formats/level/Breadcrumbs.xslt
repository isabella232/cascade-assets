<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<ul>
			<xsl:for-each select="//system-folder">
				<xsl:choose>
					<xsl:when test="name = '/'">
						<li>
							<a class="home" href="{link}/index" title="Chapman University Website Home Page">
								<svg
									xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-inline--fa fa-home fa-w-18" data-icon="home" data-prefix="fas" focusable="false" role="img" viewBox="0 0 576 512">
									<path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" fill="currentColor"/>
								</svg>
							</a>
						</li>
					</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="system-page[@current]/name = 'index'">
								<li>
									<span class="bullet ">
										<svg
											xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-inline--fa fa-caret-right fa-w-6" data-icon="caret-right" data-prefix="fas" focusable="false" role="img" viewBox="0 0 192 512">
											<path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" fill="currentColor"/>
										</svg>
									</span>
									<xsl:if test="//system-page[@current]/dynamic-metadata[1][value='Yes']">
										<xsl:attribute name="class">hidden</xsl:attribute>
									</xsl:if>
									<xsl:value-of select="//system-folder[@current]/display-name"/>
								</li>
							</xsl:when>
							<xsl:otherwise>
								<li>
									<span class="bullet ">
										<svg
											xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-inline--fa fa-caret-right fa-w-6" data-icon="caret-right" data-prefix="fas" focusable="false" role="img" viewBox="0 0 192 512">
											<path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" fill="currentColor"/>
										</svg>
									</span>
									<xsl:if test="dynamic-metadata[1][value='Yes']">
										<xsl:attribute name="class">hidden</xsl:attribute>
									</xsl:if>
									<a href="{link}/index">
										<xsl:value-of select="display-name"/>
									</a>
								</li>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
			<xsl:if test="//system-page[@current]/name != 'index'">
				<li>
					<span class="bullet">
						<svg
							xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="svg-inline--fa fa-caret-right fa-w-6" data-icon="caret-right" data-prefix="fas" focusable="false" role="img" viewBox="0 0 192 512">
							<path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" fill="currentColor"/>
						</svg>
					</span>
					<xsl:if test="//system-page[@current]/dynamic-metadata[1][value='Yes']">
						<xsl:attribute name="class">hidden</xsl:attribute>
					</xsl:if>
					<xsl:value-of select="//system-page[@current]/display-name"/>
				</li>
			</xsl:if>
		</ul>
	</xsl:template>
</xsl:stylesheet>